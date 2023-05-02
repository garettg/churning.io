import React from 'react';
import {Label, TextInput, Select, Button, Spinner, Alert} from "flowbite-react";
import {IoWarningOutline} from "react-icons/io5";
import {HiEye} from "react-icons/hi2";
import {DateRange} from "react-date-range";
import {parseISO} from 'date-fns';
import classNames from "classnames";

import {SearchRange} from "../utils/Constants";
import {Config} from "../../app.config";
import {useSearchContext} from "../utils/Context";

const SearchForm = () => {
    const {
        query,
        author,
        selectionRange,
        order,
        time,
        search,
        setState,
        searched,
        searching,
    } = useSearchContext();

    const searchSubmit = async (e) => {
        // Update state
        e.preventDefault();
        search(true);
    };

    const handleChange = (e) => {
        setState((oldState) => ({ ...oldState, [e.target.name]: e.target.value }));
    };

    const handleRangeChange = (item) => {
        setState((oldState) => ({ ...oldState, selectionRange: item.selection }))
    }

    const timeRangeOptions = Object.entries(SearchRange).map(([key, value], index) => {
        return (
            <option value={key} key={index}>{value}</option>
        );
    });

    let searchButtonLabel = "Search"
    if (searching) {
        searchButtonLabel =
            <>
                <span className="mr-3">
                    <Spinner size="sm" light={true} />
                </span>
                Searching ...
            </>;
    }

    let searchButtonDisabled = (query === "" && author === "");

    let searchWarning = !searched && !searching ? (
        <div className="mt-4">
            <Alert
                color="warning"
                icon={IoWarningOutline}
                additionalContent={
                    <>
                        <div className="mb-3 text-sm">Make sure time range includes dates before May 1. Search will not contain comments posted after May 1.</div>
                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                color="warning"
                                href="https://www.reddit.com/r/churning/comments/134h60p/daily_discussion_thread_may_01_2023/jignyu3/"
                                target="_blank"
                                size="xs"
                                pill>
                                <HiEye className="-ml-0.5 mr-2 h-4 w-4" /> More info
                            </Button>
                        </div>
                    </>
                }
                rounded>
                <h4 className="text-lg font-medium">Search Issue</h4>
            </Alert>
        </div>
    ) : null;

    return (
        <form onSubmit={searchSubmit} className="flex flex-col gap-3 lg:gap-4 mt-3 md:mt-4" role="search" aria-label="Search Form">
            <div>
                <div className="lg:mb-1">
                    <Label htmlFor="query" value="Search" />
                </div>
                <TextInput
                    id="query"
                    name="query"
                    type="search"
                    value={query}
                    onChange={handleChange}
                />
            </div>
            <div>
                <div className="lg:mb-1">
                    <Label htmlFor="author" value="Author" />
                </div>
                <TextInput
                    id="author"
                    name="author"
                    type="search"
                    value={author}
                    onChange={handleChange}
                />
            </div>
            <div>
                <div className="lg:mb-1">
                    <Label htmlFor="time" value="Time Range" />
                </div>
                <Select
                    id="time"
                    name="time"
                    value={time}
                    onChange={handleChange}>
                    {timeRangeOptions}
                    <option value="all">All</option>
                    <option value="">Custom</option>
                </Select>
            </div>
            <div className={classNames('custom-date-range', {"hidden": time !== ""})}>
                <Label htmlFor="date-range" value="Custom Time Range" className="sr-only" />
                <DateRange
                    id="date-range"
                    editableDateInputs={false}
                    onChange={(item) => handleRangeChange(item)}
                    moveRangeOnFirstSelection={false}
                    minDate={parseISO(`${Config.appSubredditDate}T00:00:00`)}
                    maxDate={new Date()}
                    ranges={[selectionRange]}
                    rangeColors={['#1B5DE7', '#3ecf8e', '#fed14c']}
                />
            </div>
            <div>
                <div className="lg:mb-1">
                    <Label htmlFor="order" value="Sort By" />
                </div>
                <Select
                    id="order"
                    name="order"
                    value={order}
                    onChange={handleChange}>
                    <option value="desc">Newest</option>
                    <option value="asc">Oldest</option>
                </Select>
            </div>
            <div className="mt-4">
                <Button
                    disabled={searchButtonDisabled}
                    aria-disabled={searchButtonDisabled}
                    aria-label="Search"
                    type="submit"
                    fullSized>
                    {searchButtonLabel}
                </Button>
            </div>
            {searchWarning}
        </form>
    );
}

export default SearchForm;