import {useQuery} from "@tanstack/react-query";
import querystring from "querystring";
import {toDate, parseISO, getUnixTime, subDays, startOfDay, endOfDay, format, differenceInDays} from 'date-fns';

import {Config} from "../../app.config";
import {compress, fetchWithTimeout, getThreadType, convertAcronymQuery, customEvent, gaEvent} from "./Utils";
import {GaDateFormat, KeywordsRegex} from "./Constants";

const SearchParameters = {
    "pullpush": {
        query: "q",
        author: "author",
        subreddit: "subreddit",
        size: "size",
        sort_type: "sort_type",
        before: "before",
        after: "after",
        sort: "sort"
    },
    "arcticshift": {
        query: "body",
        author: "author",
        subreddit: "subreddit",
        size: "limit",
        sort_type: undefined,
        before: "before",
        after: "after",
        sort: "sort"
    }
}

export class PushshiftAPI {
    constructUrl(formData, options) {
        const params = {
            ...(SearchParameters[Config.api].subreddit && {[SearchParameters[Config.api].subreddit]: formData.subreddit}),
            ...(SearchParameters[Config.api].sort_type && {[SearchParameters[Config.api].sort_type]: "created_utc"}),
            ...(SearchParameters[Config.api].size && {[SearchParameters[Config.api].size]: 100}),
        };

        if (formData.hasOwnProperty("query") && formData.query) {
            params[SearchParameters[Config.api].query] = Config.enableAcronymSearch ? convertAcronymQuery(formData.query) : formData.query;
        }

        if (formData.hasOwnProperty("author") && formData.author) {
            params[SearchParameters[Config.api].author] = formData.author;
        }

        if (formData.time !== "") {
            if (formData.time !== "all") {
                params[SearchParameters[Config.api].after] = getUnixTime(subDays(startOfDay(new Date()), parseInt(formData.time)));
            } else {
                // Convert subreddit start date to unix time stamp
                params[SearchParameters[Config.api].after] = getUnixTime(toDate(parseISO(Config.subreddits[formData.subreddit])));
            }
        } else {
            const startDate = getUnixTime(startOfDay(formData.selectionRange.startDate));
            const endDate = getUnixTime(endOfDay(formData.selectionRange.endDate));

            params[SearchParameters[Config.api].after] = startDate;
            params[SearchParameters[Config.api].before] = endDate;
        }

        if (formData.sort) {
            params[SearchParameters[Config.api].sort] = formData.sort;
        }

        // For testing error handling
        // return 'https://httpstat.us/503';
        switch (Config.api) {
            case "arcticshift":
                return `https://arctic-shift.photon-reddit.com/api/comments/search?${querystring.stringify(params)}`;
            case "pullpush":
                return `https://api.pullpush.io/reddit/search/comment?${querystring.stringify(params)}`;
            default:
                return `https://api.pullpush.io/reddit/search/comment?${querystring.stringify(params)}`;
        }
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
                throw response.statusText;
            }

            return results.data;
        } catch (error) {
            throw error;
        }
    }

    usePushshiftQuery(state, options) {
        const { sort } = state;

        return useQuery(
            [Config.api, state],
            async () => {
                const pushshiftUrl = this.constructUrl(state, options);

                localStorage.setItem(Config.id + "-data", compress(state));
                console.log("[local storage] state: updated");

                try {
                    const dataResults = await this.query(pushshiftUrl);

                    const data = dataResults.sort((a, b) => {
                        if (sort === "asc") {
                            return a.created_utc - b.created_utc;
                        } else {
                            return b.created_utc - a.created_utc;
                        }
                    });

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

                    let {selectionRange: _, ...rest} = state;
                    let eventData = Object.assign({}, rest, {
                        time: rest.time !== "" ? (
                            rest.time !== "all" ? rest.time : (differenceInDays(endOfDay(new Date()), startOfDay(toDate(parseISO(Config.subreddits[rest.subreddit])))) + 1)
                        ) : (differenceInDays(endOfDay(state.selectionRange.endDate), startOfDay(state.selectionRange.startDate)) + 1),
                        keywords: state.query.replace(KeywordsRegex, ' ').trim().replace(/\s+/g, ',').trim().toLowerCase(),
                        resultCount: data.length
                    });

                    customEvent("search", eventData);

                    return data;
                } catch (error) {
                    customEvent("error", {
                        datetime: format(new Date(), `${GaDateFormat} HH:mm:ss z`),
                        type: "search",
                        error: error
                    });

                    throw error;
                }
            },
            {
                cacheTime: 0,
                refetchOnMount: false,
                refetchOnWindowFocus: false,
                refetchOnReconnect: false,
                enabled: false, // disable this query from automatically running
                notifyOnChangeProps: ['data', 'error', 'isLoading', 'fetchStatus'],
                retry: false, // disable retries for query failure
                retryOnMount: false,
                initialData: undefined
            },
        );
    }
}


