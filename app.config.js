import {Acronyms} from "./src/utils/Constants";

export const Config = {
    appId: "churning-search", // id for app (use in local storage)
    appName: "Churning Search", // App name and title
    appAnalyticsId: "G-8EKXCHKLR9", // Google Analytics measurement id
    appDomain: "churning.io",
    appHosts: [
        "churning.io",
        "garettg.github.io"
    ], // GitHub and custom domain (if there is one)
    appAuthor: "garettg", // reddit username of app author
    appSubreddit: "churning", // subreddit name
    appSubredditDate: "2012-12-11", // start date of the subreddit
    defaultTimeRange: 366, // default time range on search (must match one of SearchRange keys)
    enableAcronymSearch: true, // enable the use of modified queries to include acronyms to broaden search,
    enableGaEvents: true, // enable google analytics
    enableCustomEvents: true, // enable the usage of custom event to Woopra
    disableSearch: false, // turns off the UI in downtimes
    announce: {
        enable: true,
        color: "warning", // info, failure, warning, success
        message: "Because of scheduled API maintenance, search will be unavailable for next couple days."
    }
}