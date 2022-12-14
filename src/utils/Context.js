import React, { useEffect, useState, useContext, createContext, useMemo } from "react";
import {format, subDays} from "date-fns";
import { isEmpty } from "underscore";

import {Config} from "../../app.config";
import {compress, decompress, gaEvent} from "./Utils";
import { PushshiftAPI } from "./Api";
import {GaDateFormat, KeywordsRegex} from "./Constants";

const api = new PushshiftAPI();

const idOptions = Config.appId + "-options";
const idData = Config.appId + "-data";

let prefersDarkMode = false;
if (typeof window !== "undefined") {
    prefersDarkMode = window.matchMedia("(prefers-color-scheme:dark)").matches;
}

const defaultState = {
    query: "",
    author: "",
    time: "7d",
    selectionRange: {
        startDate: subDays(new Date(), 7),
        endDate: new Date(),
        key: "selection"
    },
    sort: "desc"
};

const defaultOptions = {
    oldReddit: false,
    showDate: false,
    darkMode: prefersDarkMode,
    addAwardTravel: false
}

const SearchContext = createContext({
    setState: () => undefined,
    setThreadFilters: () => undefined,
    search: () => undefined,
    reset: () => undefined,
    searching: false,
    searched: false,
    error: null,
    comments: [],
    allData: [],
    threadFilters: {},
    filteredCount: 0,
    totalCount: 0,
    shareUrl: "",
    options: defaultOptions,
    setOptions: () => undefined,
    ...defaultState
});

const SearchContextProvider = (props) => {
    const [state, setState] = useState(defaultState);
    const [threadFilters, setThreadFilters] = useState({});
    const [options, setOptions] = useState(defaultOptions);
    const { refetch, error, data, isRefetching, fetchStatus } = api.usePushshiftQuery(state, options);

    const loadSavedState = (formData = {}, shouldSearch = false) => {
        if (!isEmpty(formData)) {
            if (formData.selectionRange && formData.selectionRange.startDate && formData.selectionRange.endDate) {
                formData.selectionRange.startDate = new Date(formData.selectionRange.startDate);
                formData.selectionRange.endDate = new Date(formData.selectionRange.endDate);
            }
            if (formData.hasOwnProperty("threadFilters") && formData.threadFilters && !isEmpty(formData.threadFilters)) {
                setThreadFilters(formData.threadFilters);
            }

            setState({ ...defaultState, ...formData });

            if (shouldSearch) {
                setTimeout(search, 250);
            }
        }
    };

    useEffect(() => {
        const localStorageOptions = decompress(localStorage.getItem(idOptions));
        if (!isEmpty(localStorageOptions)) {
            // Load stored form data if exists
            setOptions({...defaultOptions, ...localStorageOptions});
            console.log("Loaded options from local storage");
        }

        if (window.location.hash) {
            const formData = decompress(window.location.hash.slice(1));
            loadSavedState(formData, true);
            console.log("Loaded state from location.hash");
            // Remove hash now that we have the data
            history.replaceState(null, null, " ");
            return;
        }

        const localStorageData = decompress(localStorage.getItem(idData));
        if (!isEmpty(localStorageData)) {
            // Load stored form data if exists
            loadSavedState(localStorageData);
            console.log("Loaded state from local storage");
        }
    }, []);

    useEffect(() => {
        if (!data) {
            return;
        }

        setThreadFilters((prevThreadFilters) => {
            // Build a list of unique threads and sort
            const threadsOptions = {};
            const threadsList = Array.from(new Set(data.map((c) => c.thread))).sort();
            for (let thread of threadsList) {
                thread ||= "None";
                if (!isEmpty(prevThreadFilters) && thread in prevThreadFilters) {
                    threadsOptions[thread] = prevThreadFilters[thread];
                } else {
                    threadsOptions[thread] = true;
                }
            }

            return threadsOptions;
        });
    }, [data]);

    const comments = useMemo(() => {
        return (data || []).filter((comment) => {
            const selected = Object.keys(threadFilters).filter((x) => threadFilters[x]);
            if (!comment.thread) {
                return selected.includes("None");
            } else {
                return selected.includes(comment.thread);
            }
        });
    }, [threadFilters, data]);

    const shareUrl = `${typeof window === "undefined" ? "/" : window.location.href}#${compress({...state, threadFilters: threadFilters})}`;

    let searched = data !== undefined

    const reset = () => {
        searched = false;
        setThreadFilters({});
        setState(defaultState);
    }

    const search = () => {
        for (const [key, value] of Object.entries(state)) {
            if (value !== "") {
                let eventValue = value;

                if (key === "selectionRange" && state.time === "") {
                    eventValue = `${format(value.startDate, GaDateFormat)} - ${format(value.endDate, GaDateFormat)}`
                }
                if (key === "selectionRange" && state.time !== "") {
                    continue;
                }

                gaEvent("search", {
                    category: "Search",
                    label: key,
                    value: eventValue,
                    nonInteraction: true
                });

                if (key === "query") {
                    let keywords = value.replace(KeywordsRegex, ' ').replace(/\s\s+/g, ' ').trim().toLowerCase().split(" ");
                    keywords.map(term => {
                        gaEvent("search", {
                            category: "Search",
                            label: "keyword",
                            value: term,
                            nonInteraction: true
                        });
                    })
                }
            }
        }
        refetch();
    }

    return (
        <SearchContext.Provider
            value={{
                ...state,
                setState,
                search: search,
                error,
                comments,
                allData: data,
                totalCount: (data || []).length,
                filteredCount: (comments || []).length,
                searching: fetchStatus === "fetching" || isRefetching,
                reset: reset,
                searched: searched,
                threadFilters,
                setThreadFilters,
                options,
                setOptions,
                shareUrl
            }}
        >
            {props.children}
        </SearchContext.Provider>
    );
}

const useSearchContext = () => useContext(SearchContext);

export {SearchContextProvider, useSearchContext};
