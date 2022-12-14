import {Checkbox, Label, Spinner} from "flowbite-react";

import {useSearchContext} from "../utils/Context";
import {LinkClasses} from "../utils/Constants";
import {gaEvent} from "../utils/Utils";

const Facets = () => {
    const {
        threadFilters,
        setThreadFilters,
        searching,
        allData
    } = useSearchContext();

    if (searching) {
        return (
            <div className="mt-8 md:mt-0 lg:mt-8 md:w-1/2 lg:w-full md:pl-4 lg:pl-0">
                <div className="hidden md:flex flex-col text-center ">
                    <Spinner aria-label="Searching..." size="md" />
                </div>
            </div>
        );
    }

    if (!threadFilters || Object.keys(threadFilters).length <= 1 || allData === undefined) {
        return null;
    }

    const handleChange = (e) => {
        threadFilters[e.target.name] = e.target.checked;
        setThreadFilters({...threadFilters});
        gaEvent("filter", {
            category: "Filter",
            label: (e.target.checked ? 'Show' : 'Hide'),
            value: e.target.name,
            nonInteraction: true
        });
    }

    const handleOnly = (key) => {
        for (const subkey in threadFilters) {
            threadFilters[subkey] = subkey === key;
        }
        setThreadFilters({...threadFilters});
        gaEvent("filter", {
            category: "Filter",
            label: "Only",
            value: key,
            nonInteraction: true
        });
    }

    const handleAll = () => {
        for (const key in threadFilters) {
            threadFilters[key] = true;
        }
        setThreadFilters({...threadFilters});
        gaEvent("filter", {
            category: "Filter",
            label: "All",
            value: "All",
            nonInteraction: true
        });
    }

    const allChecked = Object.values(threadFilters).every((v) => v);
    let selectAll;
    if (!allChecked) {
        selectAll =
            <button
                className={`text-sm ${LinkClasses}`}
                onClick={handleAll}>
                Select All
            </button>
    }

    const threadFiltersList = Object.entries(threadFilters);
    const threadsFilter = threadFiltersList.map(([key, value], i) => {
        const checkboxId = key.replace(/\s/g, '-').toLowerCase();

        let listItemClasses;
        switch (i) {
            case 0:
                listItemClasses = "rounded-t-lg border-b border-gray-200 dark:border-gray-600";
                break;
            case (threadFiltersList.length - 1):
                listItemClasses = "rounded-b-lg";
                break;
            default:
                listItemClasses = "border-b border-gray-200 dark:border-gray-600";
        }
        return (
            <li className={`flex items-center flex-wrap gap-4 facet py-2 px-4 w-full ${listItemClasses}`} key={i}>
                <Checkbox
                    id={checkboxId}
                    name={key}
                    checked={value}
                    onChange={handleChange}
                />
                <Label htmlFor={checkboxId} className="cursor-pointer">{key}</Label>
                <button
                    className={`text-xs ${LinkClasses}`}
                    aria-label={`show only ${key} thread results`}
                    onClick={() => handleOnly(key)}>
                    only
                </button>
            </li>
        )
    });

    return (
        <div role="region" aria-label="Search Result Filters" className="mt-8 md:mt-0 lg:mt-8 md:w-1/2 lg:w-full md:pl-4 lg:pl-0">
            <div className="mb-1 block flex justify-between items-center">
                <Label htmlFor="threads-filter">Threads Filter</Label>
                {selectAll}
            </div>
            <ul id="threads-filter" className="text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {threadsFilter}
            </ul>
        </div>
    )
}

export default Facets;