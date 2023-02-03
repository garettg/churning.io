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

export const KeywordsRegex = /[\"\'\|\(\)*’&]|(\s\,|\,\s|\+|\s\-|\s\%\s|\s\>\s|\s\<\s|\sor\s|\sOR\s|\sand\s|\sAND\s)/gi;

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
        regex: /weekly_discussion_thread_/
    },
    "dd": {
        name: "Daily Discussion",
        color: "orange",
        regex: /(discussion_thread_|daily_discussion_)/
    },
    "ms": {
        name: "Manufactured Spend",
        color: "purple",
        regex: /manufactured_spending_weekly_/
    },
    "dp": {
        name: "Data Points",
        color: "cyan",
        regex: /(data_points_central_|data_points_weekly_|dq_thread_)/
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
    }
};