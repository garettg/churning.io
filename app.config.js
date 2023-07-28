export const Config = {
    id: "churning-search", // id for app (use in local storage)
    name: "Churning Search", // App name and title
    analyticsId: "G-8EKXCHKLR9", // Google Analytics measurement id
    domain: "churning.io",
    hosts: [
        "churning.io",
        "garettg.github.io"
    ], // GitHub and custom domain (if there is one)
    author: "garettg", // reddit username of app author
    defaultSubreddit: "churning", // subreddit name
    subreddits: { // key is subreddit, value is the start date the subreddit
        churning: "2012-12-11",
        awardtravel: "2015-01-07",
        creditcards: "2008-09-14",
        churningcanada: "2014-02-20",
        CanadianAwardTravel: "2018-03-12"
    },
    defaultTimeRange: 366, // default time range on search (must match one of SearchRange keys)
    enableAcronymSearch: true, // enable the use of modified queries to include acronyms to broaden search,
    enableGaEvents: true, // enable google analytics
    enableCustomEvents: true, // enable the usage of custom event to Woopra
    disableSearch: false, // turns off the UI in downtimes
    announce: {
        enable: false,
        color: "warning", // info, failure, warning, success
        message: "Because of scheduled API maintenance, search will be unavailable until July 28."
    }
}