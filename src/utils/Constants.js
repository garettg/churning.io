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

export const ButtonClasses = classNames(
    "text-white",
    "text-center",
    "font-medium",

    "bg-blue-700",
    "hover:bg-blue-800",
    "disabled:hover:bg-blue-700",
    "dark:bg-blue-600",
    "dark:hover:bg-blue-700",
    "dark:disabled:hover:bg-blue-600",

    "border",
    "border-transparent",

    "focus:ring-4",
    "focus:ring-blue-300",
    "dark:focus:ring-blue-800",
    "focus:!ring-2",
    "focus:z-10",

    "group",
    "flex",
    "h-min",
    "items-center",
    "justify-center",
    "py-1 md:py-2",
    "px-2 md:px-3",

    "rounded-lg"
);

export const BadgeClasses = classNames(
    "flex",
    "h-fit",
    "items-center",
    "gap-1",
    "font-semibold",
    "bg-blue-100",
    "text-blue-800",
    "dark:bg-blue-200",
    "dark:text-blue-800",
    "group-hover:bg-blue-200",
    "dark:group-hover:bg-blue-300",
    "rounded-full",
    "p-1.5",
    "text-xs"
)