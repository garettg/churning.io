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