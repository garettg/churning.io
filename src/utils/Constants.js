import classNames from "classnames";

export const SearchRange = {
    "1": "1 Day",
    "7": "1 Week",
    "31": "1 Month",
    "90": "3 Months",
    "182": "6 Months",
    "366": "1 Year",
    "732": "2 Years"
};

export const GaDateFormat = "yyyy-MM-dd";

export const KeywordsRegex = /["'|()\[\]{}*’&,]|(\+|(\s|^)-|(\s|^)%\s|(\s|^)>\s|(\s|^)<\s|(\s|^)or\s|(\s|^)and\s)/gmi;

export const BlockquoteRegEx = /(^|\n\n)&gt;/gmi;

export const LinkClasses = classNames(
    "focus:outline-none",
    "text-blue-700",
    "hover:text-blue-800",
    "dark:text-blue-400",
    "dark:hover:text-blue-500",
    "hover:underline"
);

export const ThreadTypes = {
    "mega": {
        name: "Megathread",
        color: "stone",
        regex: /_megathread/
    },
    "bank": {
        name: "Bank Account Bonus",
        color: "success",
        regex: /(bank_account_bonus_week_|bank_bonus_weekly_)/
    },
    "dq": {
        name: "Daily Question",
        color: "fuchsia",
        regex: /(question_thread_|newbie_question_weekly_|newbie_weekly_question_)/
    },
    "wd": {
        name: "Weekly Discussion",
        color: "pink",
        regex: /(weekly_discussion_thread_|weekly_us_churning_)/
    },
    "dd": {
        name: "Daily Discussion",
        color: "orange",
        regex: /(discussion_thread_|daily_discussion_thread_)/
    },
    "ms": {
        name: "Manufactured Spend",
        color: "purple",
        regex: /manufactured_spending_weekly_/
    },
    "dp": {
        name: "Data Points",
        color: "cyan",
        regex: /(data_points_central_|data_point_weekly_|data_points_weekly_|dq_thread_)/
    },
    "what": {
        name: "What Card Should I Get",
        color: "indigo",
        regex: /what_card_should_i_get_/
    },
    "frustration": {
        name: "Frustration",
        color: "failure",
        regex: /frustration_friday_/
    },
    "mods": {
        name: "Mod's Choice",
        color: "gray",
        regex: /mods_choice_/
    },
    "ot": {
        name: "Off Topic",
        color: "info",
        regex: /(weekly_offtopic_thread_|weekly_off_topic_thread_|anything_goes_thread_)/
    },
    "trip": {
        name: "Trip Report/Success",
        color: "lime",
        regex: /(trip_report_and_churning_success_|trip_reports_and_churning_success_|storytime_weekly_|trip_report_weekly_)/
    },
    "at": {
        name: "AwardTravel",
        color: "info",
        regex: /(weekly_awardtravel_)/
    },
    "win": {
        name: "Winning",
        color: "lime",
        regex: /(winning_thursdays_)/
    }
}

export const FlowbiteTheme = {
    badge: {
        root: {
            color: {
                fuchsia: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-200 dark:text-fuchsia-900 group-hover:bg-fuchsia-200 dark:group-hover:bg-fuchsia-300',
                orange: 'bg-orange-100 text-orange-800 dark:bg-orange-200 dark:text-orange-900 group-hover:bg-orange-200 dark:group-hover:bg-orange-300',
                cyan: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-200 dark:text-cyan-900 group-hover:bg-cyan-200 dark:group-hover:bg-cyan-300',
                stone: 'bg-stone-100 text-stone-800 dark:bg-stone-200 dark:text-stone-900 group-hover:bg-stone-200 dark:group-hover:bg-stone-300',
                lime: 'bg-lime-100 text-lime-800 dark:bg-lime-200 dark:text-lime-900 group-hover:bg-lime-200 dark:group-hover:bg-lime-300',
            }
        }
    },
    alert: {
        root: {
            color: {
                teal: 'text-teal-700 bg-teal-100 border-teal-500 dark:bg-teal-200 dark:text-teal-800'
            }
        }
    },
    button: {
        color: {
            teal: 'text-white bg-teal-700 border border-transparent hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 disabled:hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 dark:disabled:hover:bg-teal-600',
            blue: 'text-white bg-blue-700 border border-transparent hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 disabled:hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:disabled:hover:bg-blue-600'
        }
    },
    select: {
        field: {
            select: {
                colors: {
                    gray: 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                }
            }
        }
    },
    textInput: {
        field: {
            input: {
                colors: {
                    gray: "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500",
                }
            }
        }
    },
    toggleSwitch: {
        toggle: {
            checked: {
                color: {
                    blue: "bg-blue-700 border-blue-700"
                }
            }
        }
    }
};

export const DisqualifyAcronymsCharacters = /[\(\)\|\'\"]/g

export const Acronyms = {
    "annual fee": "af",
    "american express": "amex",
    "authorized user": "au",
    "bank of america": "boa",
    "us bank": "usb",
    "capital one": "c1",
    "barclays": "barclay",
    "wells fargo": "wf",
    "cash back": "cb",
    "direct deposit": "dd",
    "data point": "dp",
    "equifax": "eq",
    "experian": "ex",
    "transunion": "tu",
    "gift card": "gc",
    "global entry": "ge",
    "hard pull": "hp",
    "money order": "mo",
    "membership rewards": "mr",
    "manufactured spend": "ms",
    "no lifetime language": "nll",
    "product change": "pc",
    "sign up bonus": "sub",
    "business": "biz",
    "credit card": "cc",
    "platinum": "plat",
    "delta": "dl",
    "american airlines": "aa",
    "southwest": "sw",
    "united": "ua",
    "application": "app",
    "sapphire reserve": "csr",
    "sapphire preferred": "csp",
    "ink preferred": "cip",
    "ink cash": "cic",
    "ink unlimited": "ciu",
    "chase freedom": "cf",
    "freedom flex": "cff",
    "freedom unlimited": "cfu",
    "pay yourself back": "pyb",
    "modified double dip": "mdd",
    "companion pass": "cp",
    "travelbank": "tb",
    "secure message": "sm",
    "flyertalk": "ft"
}

export const Suggestions = [
    {
        matches: [
            "sw|southwest",
            "cp|companion pass"
        ],
        name: "Southwest Companion Pass",
        link: "https://www.reddit.com/r/churning/comments/pgph18/2021_southwest_companion_pass_megathread/"
    },
    {
        matches: [
            "mdd|modified double dip|double dip|modified dd|dd"
        ],
        name: "Modified Double Dip",
        link: "https://www.reddit.com/r/churning/comments/nq1082/the_missing_modified_double_dip_mdd_reference/"
    },
    {
        matches: [
            "sapphire|csr|csp|cs"
        ],
        name: "Chase Sapphire Cards",
        link: "https://www.reddit.com/user/garettg/comments/u6ss7u/sapphire_fyis/"
    },
    {
        matches: [
            "1\/90|2\/90|1\/30|2\/30|1\/5|1\/8|2\/65|1\/95|5\/24|1\/24|1\/48"
        ],
        name: "Anti-Churning Rules",
        link: "https://www.reddit.com/r/churning/comments/819r08/list_of_antichurning_rules/"
    }
]
