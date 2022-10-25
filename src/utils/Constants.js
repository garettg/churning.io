import classNames from "classnames";

export const SearchRange = {
    "1d": { "name": "1 Day", "beta": 1 },
    "7d": { "name": "1 Week", "beta": 7 },
    "31d": { "name": "1 Month", "beta": 31 },
    "90d": { "name": "3 Months", "beta": 90 },
    "182d": { "name": "6 Months", "beta": 182 },
    "1y": { "name": "1 Year", "beta": 366 },
    "2y": { "name": "2 Years", "beta": 732 }
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