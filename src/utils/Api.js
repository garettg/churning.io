import {useQuery} from "@tanstack/react-query";
import querystring from "querystring";
import {toDate, parseISO, getUnixTime, subDays, subMonths, startOfDay, endOfDay, format} from 'date-fns';

import {Config} from "../../app.config";
import {compress, fetchWithTimeout, getThreadType, convertAcronymQuery, gaEvent, isDevMode} from "./Utils";
import {GaDateFormat, KeywordsRegex} from "./Constants";

export const ApiSources = {
    PULLPUSH: "pullpush",
    ARCTICSHIFT: "arcticshift"
};

export const ApiModes = {
    AUTO: "auto",
    ...ApiSources
};

export const ArcticShiftStartDate = "2025-05-19";
export const ArcticShiftStartUnix = getUnixTime(startOfDay(parseISO(ArcticShiftStartDate)));
const KarmaPageSize = 100;

const SearchParameters = {
    [ApiSources.PULLPUSH]: {
        query: "q",
        author: "author",
        subreddit: "subreddit",
        size: "size",
        sort_type: "sort_type",
        before: "before",
        after: "after",
        sort: "sort",
        limit: 100,
        url: "https://api.pullpush.io/comment",
    },
    [ApiSources.ARCTICSHIFT]: {
        query: "body",
        author: "author",
        subreddit: "subreddit",
        size: "limit",
        sort_type: undefined,
        before: "before",
        after: "after",
        sort: "sort",
        limit: 100,
        url: "https://arctic-shift.photon-reddit.com/api/comments/search",
    }
}

export class DataAPI {
    async getSubredditCommentKarma(username, onProgress = () => undefined) {
        const normalizedUsername = username.trim().replace(/^u\//i, "");

        if (!/^[A-Za-z0-9_-]{3,20}$/.test(normalizedUsername)) {
            throw new Error("Enter a valid Reddit username.");
        }

        const subreddit = Config.defaultSubreddit;
        const after = getUnixTime(subMonths(new Date(), 3));
        let before = getUnixTime(new Date());
        let totalScore = 0;
        let commentCount = 0;
        let pageCount = 0;
        const commentIds = new Set();

        while (before > after) {
            const params = {
                author: normalizedUsername,
                subreddit,
                after,
                before,
                limit: KarmaPageSize,
                sort: "desc",
                fields: "id,score,created_utc"
            };
            const url = `https://arctic-shift.photon-reddit.com/api/comments/search?${querystring.stringify(params)}`;
            const comments = await this.query(url);

            if (!Array.isArray(comments) || comments.length === 0) {
                break;
            }

            let oldestCommentTime = before;

            for (const comment of comments) {
                const commentTime = Number(comment.created_utc);
                const commentId = comment.id ? String(comment.id) : `${commentTime}:${comment.score}`;

                if (commentIds.has(commentId)) {
                    continue;
                }

                commentIds.add(commentId);

                const score = Number(comment.score);
                if (Number.isFinite(score)) {
                    totalScore += Math.max(score - 1, 0);
                    commentCount += 1;
                }

                if (Number.isFinite(commentTime)) {
                    oldestCommentTime = Math.min(oldestCommentTime, commentTime);
                }
            }

            pageCount += 1;
            onProgress({commentCount, pageCount});

            if (comments.length < KarmaPageSize || !Number.isFinite(oldestCommentTime) || oldestCommentTime >= before) {
                break;
            }

            before = oldestCommentTime - 1;
        }

        return {
            username: normalizedUsername,
            subreddit,
            totalScore,
            commentCount,
            pageCount
        };
    }

    getSearchDateRange(formData) {
        if (formData.time !== "") {
            if (formData.time !== "all") {
                return {
                    after: getUnixTime(subDays(startOfDay(new Date()), parseInt(formData.time, 10))),
                    before: getUnixTime(new Date())
                };
            }

            return {
                after: getUnixTime(toDate(parseISO(Config.subreddits[formData.subreddit]))),
                before: getUnixTime(new Date())
            };
        }

        return {
            after: getUnixTime(startOfDay(formData.selectionRange.startDate)),
            before: getUnixTime(endOfDay(formData.selectionRange.endDate))
        };
    }

    getSearchRequests(formData) {
        const { after, before } = this.getSearchDateRange(formData);

        if (Config.api === ApiSources.PULLPUSH || Config.api === ApiSources.ARCTICSHIFT) {
            return [{
                api: Config.api,
                after,
                before
            }];
        }

        if (before < ArcticShiftStartUnix) {
            return [{
                api: ApiSources.PULLPUSH,
                after,
                before
            }];
        }

        if (after >= ArcticShiftStartUnix) {
            return [{
                api: ApiSources.ARCTICSHIFT,
                after,
                before
            }];
        }

        return [
            {
                api: ApiSources.PULLPUSH,
                after,
                before: ArcticShiftStartUnix - 1
            },
            {
                api: ApiSources.ARCTICSHIFT,
                after: ArcticShiftStartUnix,
                before
            }
        ];
    }

    constructUrl(formData, options, searchRequest) {
        const request = searchRequest ?? this.getSearchRequests(formData)[0];
        const searchParameters = SearchParameters[request.api];
        const params = {
            ...(searchParameters.subreddit && {[searchParameters.subreddit]: formData.subreddit}),
            ...(searchParameters.sort_type && {[searchParameters.sort_type]: "created_utc"}),
            ...(searchParameters.size && {[searchParameters.size]: formData.limit ?? searchParameters.limit}),
        };

        if (formData.hasOwnProperty("query") && formData.query) {
            params[searchParameters.query] = this.getQuery(formData.query, request.api);
        }

        if (formData.hasOwnProperty("author") && formData.author) {
            params[searchParameters.author] = formData.author;
        }

        params[searchParameters.after] = request.after;
        params[searchParameters.before] = request.before;

        if (formData.sort) {
            params[searchParameters.sort] = formData.sort;
        }

        // For testing error handling
        //return 'https://httpstat.us/503';
        return `${searchParameters.url}?${querystring.stringify(params)}`;
    }

    getQuery(query, api) {
        if (api === ApiSources.PULLPUSH || !Config.enableAcronymSearch) {
            return query;
        }

        return convertAcronymQuery(query);
    }

    getCommentKey(comment) {
        if (comment.id) {
            return `id:${String(comment.id).replace(/^t1_/, "")}`;
        }

        if (comment.permalink) {
            return `permalink:${comment.permalink}`;
        }

        return `fallback:${comment.author}:${comment.created_utc}:${comment.body}`;
    }

    getLimit(formData) {
        const limit = parseInt(formData.limit, 10);
        return Number.isNaN(limit) ? SearchParameters[ApiSources.PULLPUSH].limit : limit;
    }

    mergeResults(results, limit, sort) {
        const commentsByApi = {
            [ApiSources.PULLPUSH]: [],
            [ApiSources.ARCTICSHIFT]: []
        };

        results.forEach((result) => {
            commentsByApi[result.api].push(...(result.data || []));
        });

        const commentsByKey = new Map();

        [ApiSources.PULLPUSH, ApiSources.ARCTICSHIFT].forEach((api) => {
            commentsByApi[api].forEach((comment) => {
                const key = this.getCommentKey(comment);
                if (!commentsByKey.has(key)) {
                    commentsByKey.set(key, comment);
                }
            });
        });

        return Array.from(commentsByKey.values()).sort((a, b) => {
            if (sort === "asc") {
                return a.created_utc - b.created_utc;
            } else {
                return b.created_utc - a.created_utc;
            }
        }).slice(0, limit);
    }

    async query(url) {
        try {
            const response = await fetchWithTimeout(url, {
                referrerPolicy: "no-referrer",
            });

            const isJson = response.headers.get("content-type")?.includes("application/json");
            const results = isJson ? await response.json() : null;

            // check for error response
            if (!response.ok) {
                let message = response.statusText ? response.statusText : ( results?.error ? results.error : "An unknown error has occurred. Please try again later." );
                throw new Error(message);
            }

            return results.data;
        } catch (error) {
            throw error;
            if (isDevMode()) {
                console.error(error);
            }
        }
    }

}

export const useDataQuery = (api, state, options) => {
    const { sort } = state;

    return useQuery({
        queryKey: [Config.id, Config.api, "reddit-comments", state],
        queryFn: async () => {
            const searchRequests = api.getSearchRequests(state);

            localStorage.setItem(Config.id + "-data", compress(state));
            if (isDevMode()) {
                console.log("[local storage] state: updated");
            }

            try {
                const results = await Promise.all(searchRequests.map(async (searchRequest) => ({
                    api: searchRequest.api,
                    data: await api.query(api.constructUrl(state, options, searchRequest))
                })));
                const data = api.mergeResults(results, api.getLimit(state), sort);

                for (const datum of data) {
                    datum.thread = getThreadType(datum.permalink);
                }

                for (const [key, value] of Object.entries(state)) {
                    if (value !== "") {
                        let eventValue = value;

                        if (key === "selectionRange" && state.time === "") {
                            eventValue = `${format(value.startDate, GaDateFormat)} - ${format(value.endDate, GaDateFormat)}`
                        }
                        if (key === "selectionRange" && state.time !== "") {
                            continue;
                        }

                        gaEvent("search", {
                            category: "Search",
                            label: key,
                            value: eventValue,
                            nonInteraction: true
                        });

                        if (key === "query") {
                            let keywords = value.replace(KeywordsRegex, ' ').replace(/\s\s+/g, ' ').trim().toLowerCase().split(" ");
                            keywords.map(term => {
                                gaEvent("search", {
                                    category: "Search",
                                    label: "keyword",
                                    value: term,
                                    nonInteraction: true
                                });
                            })
                        }
                    }
                }

                return data;
            } catch (error) {
                gaEvent("error", {
                    category: "Error",
                    label: "error",
                    value: error.message,
                    nonInteraction: true
                });

                throw error;
            }
        },
        gcTime: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: false, // disable this query from automatically running
        notifyOnChangeProps: ['data', 'error', 'isLoading', 'fetchStatus'],
        retry: false, // disable retries for query failure
        retryOnMount: false,
        initialData: undefined
    });
}
