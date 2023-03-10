import {Acronyms} from "./src/utils/Constants";

export const Config = {
    appId: "churning-search", // id for app (use in local storage)
    appName: "Churning Search", // App name and title
    appAnalyticsId: "G-8EKXCHKLR9", // Google Analytics measurement id
    keenProjectId: "640b77af9164531dd5d1eb3e",
    keenWriteKey: "6c601c9387ae850366b3cc1d467fc2d9cb560c2fdf3f5ea889890eba09e78bf74aa8012e2125a1b4cc86de6d052ff3b72b816a67ca49de0f17c2a3ea3576590a9e0956967400cee49c7719ee2924b1cbc59ffdad730a97f98c92995fb635482b",
    appHosts: [
        "churning.io",
        "garettg.github.io"
    ], // GitHub and custom domain (if there is one)
    appAuthor: "garettg", // reddit username of app author
    appSubreddit: "churning", // subreddit name
    appSubredditDate: "2012-12-11", // start date of the subreddit
    defaultTimeRange: 31, // default time range on search (must match one of SearchRange keys)
    enableAcronymSearch: true, // enable the use of modified queries to include acronyms to broaden search
}