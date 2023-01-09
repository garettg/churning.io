import {useQuery} from "@tanstack/react-query";
import querystring from "querystring";
import {isEmpty} from "underscore";
import { toDate, parseISO, getUnixTime, subDays } from 'date-fns';

import {Config} from "../../app.config";
import {compress, fetchWithTimeout} from "./Utils";

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
            size: 200
        };

        if (formData.hasOwnProperty("query") && formData.query) {
            params.q = formData.query;
        }

        if (formData.hasOwnProperty("author") && formData.author) {
            params.author = formData.author;
        }

        if (formData.time !== "") {
            if (formData.time !== "all") {
                params.after = getUnixTime(subDays(new Date(), parseInt(formData.time)));
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

        if (formData.sort) {
            params.order = formData.sort;
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
        const { sort } = state;

        return useQuery(
            ["pushshift", state],
            async () => {
                const urlProd = this.constructUrl(state, options);

                localStorage.setItem(Config.appId + "-data", compress(state));
                console.log("Updated state to local storage");

                const dataResults = await this.query(urlProd);

                const data = dataResults.sort((a, b) => {
                    if (sort === "asc") {
                        return a.created_utc - b.created_utc;
                    } else {
                        return b.created_utc - a.created_utc;
                    }
                });

                for (const datum of data) {
                    let permalink = datum.permalink;
                    switch (true) {
                        case /_megathread/.test(permalink):
                            datum.thread = "Megathread";
                            break;
                        case /(bank_account_bonus_week_|bank_bonus_weekly_)/.test(permalink):
                            datum.thread = "Bank Account Bonus";
                            break;
                        case /(question_thread_|newbie_question_weekly_|newbie_weekly_question_)/.test(permalink):
                            datum.thread = "Daily Question";
                            break;
                        case /weekly_discussion_thread_/.test(permalink):
                            datum.thread = "Weekly Discussion";
                            break;
                        case /(discussion_thread_|daily_discussion_)/.test(permalink):
                            datum.thread = "Daily Discussion";
                            break;
                        case /manufactured_spending_weekly_/.test(permalink):
                            datum.thread = "Manufactured Spend";
                            break;
                        case /(data_points_central_|data_points_weekly_|dq_thread_)/.test(permalink):
                            datum.thread = "Data Points";
                            break;
                        case /what_card_should_i_get_/.test(permalink):
                            datum.thread = "What Card Should I Get";
                            break;
                        case /frustration_friday_/.test(permalink):
                            datum.thread = "Frustration";
                            break;
                        case /mods_choice_/.test(permalink):
                            datum.thread = "Mod's Choice";
                            break;
                        case /(weekly_offtopic_thread_|weekly_off_topic_thread_|anything_goes_thread_)/.test(permalink):
                            datum.thread = "Off Topic";
                            break;
                        case /(trip_report_and_churning_success_|trip_reports_and_churning_success_|storytime_weekly_|trip_report_weekly_)/.test(permalink):
                            datum.thread = "Trip Report/Success";
                            break;
                        default:
                            datum.thread = "";
                    }
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
                retryOnMount: false
            },
        );
    }
}


