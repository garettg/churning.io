import classNames from "classnames";

export const SearchRange = {
    "1d": "1 Day",
    "7d": "1 Week",
    "31d": "1 Month",
    "90d": "3 Months",
    "182d": "6 Months",
    "1y": "1 Year",
    "2y": "2 Years"
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