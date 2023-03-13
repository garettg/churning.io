import {useQuery} from "@tanstack/react-query";
import querystring from "querystring";
import {isEmpty} from "underscore";
import { toDate, parseISO, getUnixTime, subDays } from 'date-fns';

import {Config} from "../../app.config";
import {compress, fetchWithTimeout, getThreadType, convertAcronymQuery} from "./Utils";

export class PushshiftAPI {
    constructUrl(formData, options) {
        let subreddit = Config.appSubreddit;
        if (!isEmpty(options) && options.hasOwnProperty("addAwardTravel") && options.addAwardTravel) {
            subreddit = `${Config.appSubreddit},awardtravel`;
        }

        const params = {
            subreddit: subreddit,
            filter: "permalink,link_id,id,body,author,created_utc,subreddit",
            sort: "created_utc",
            html_decode: true,
            user_removed: true,
            mod_removed: false,
            size: 250
        };

        if (formData.hasOwnProperty("query") && formData.query) {
            params.q = Config.enableAcronymSearch ? convertAcronymQuery(formData.query) : formData.query;
        }

        if (formData.hasOwnProperty("author") && formData.author) {
            params.author = formData.author;
        }

        if (formData.time !== "") {
            if (formData.time !== "all") {
                params.after = getUnixTime(subDays((new Date()).setHours(0, 0, 0, 0), parseInt(formData.time)));
            } else {
                // Convert subreddit start date to unix time stamp
                params.after = getUnixTime(toDate(parseISO(Config.appSubredditDate)));
            }
        } else {
            const startDate = Math.floor(formData.selectionRange.startDate.getTime() / 1000);
            const endDate = Math.floor(formData.selectionRange.endDate.setHours(23, 59, 59, 999) / 1000);

            params.after = startDate;
            params.before = endDate;
        }

        if (formData.order) {
            params.order = formData.order;
        }

        // For testing error handling
        // return 'https://httpstat.us/521';
        return `https://api.pushshift.io/reddit/comment/search?${querystring.stringify(params)}`;
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
        const { order } = state;

        return useQuery(
            ["pushshift", state],
            async () => {
                const urlProd = this.constructUrl(state, options);

                localStorage.setItem(Config.appId + "-data", compress(state));
                console.log("Updated state to local storage");

                const dataResults = await this.query(urlProd);

                const data = dataResults.sort((a, b) => {
                    if (order === "asc") {
                        return a.created_utc - b.created_utc;
                    } else {
                        return b.created_utc - a.created_utc;
                    }
                });

                for (const datum of data) {
                    datum.thread = getThreadType(datum.permalink);
                }

                return data;
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


