import React from 'react';
import {Label, TextInput, Select, Button, Spinner} from "flowbite-react";
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
        sort,
        time,
        limit,
        subreddit,
        search,
        setState,
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

    const subredditOptions = Object.entries(Config.subreddits).map(([key, value], index) => {
        return (
            <option value={key} key={index}>{key}</option>
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

    let searchButtonDisabled = (query.length < 2 && author === "");

    return (
        <form onSubmit={searchSubmit} className="flex flex-col gap-3 lg:gap-4 mt-3 md:mt-4" role="search" aria-label="Search Form">
            <div>
                <div className="lg:mb-1">
                    <Label htmlFor="query">Search</Label>
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
                    <Label htmlFor="author">Author</Label>
                </div>
                <TextInput
                    id="author"
                    name="author"
                    type="search"
                    value={author}
                    onChange={handleChange}
                />
            </div>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                    <div className="lg:mb-1">
                        <Label htmlFor="sort">Sort By</Label>
                    </div>
                    <Select
                        id="sort"
                        name="sort"
                        value={sort}
                        onChange={handleChange}>
                        <option value="desc">Newest</option>
                        <option value="asc">Oldest</option>
                    </Select>
                </div>
                <div className="col-span-6">
                    <div className="lg:mb-1">
                        <Label htmlFor="subreddit">Subreddit</Label>
                    </div>
                    <Select
                        id="subreddit"
                        name="subreddit"
                        value={subreddit}
                        onChange={handleChange}>
                        {subredditOptions}
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                    <div className="lg:mb-1">
                        <Label htmlFor="time">Time Range</Label>
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
                <div className="col-span-6">
                    <div className="lg:mb-1">
                        <Label htmlFor="limit">Number of Results</Label>
                    </div>
                    <Select
                        id="limit"
                        name="limit"
                        value={limit}
                        onChange={handleChange}>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                    </Select>
                </div>
            </div>
            <div className={classNames('custom-date-range', {"hidden": time !== ""})}>
                <Label htmlFor="date-range" className="sr-only">Custom Time Range</Label>
                <DateRange
                    id="date-range"
                    editableDateInputs={false}
                    onChange={(item) => handleRangeChange(item)}
                    moveRangeOnFirstSelection={false}
                    minDate={parseISO(`${Config.subreddits[subreddit]}T00:00:00`)}
                    maxDate={new Date()}
                    ranges={[selectionRange]}
                    rangeColors={['#1B5DE7', '#3ecf8e', '#fed14c']}
                />
            </div>
            <div className="mt-4">
                <Button
                    color="blue"
                    disabled={searchButtonDisabled}
                    aria-disabled={searchButtonDisabled}
                    aria-label="Search"
                    type="submit"
                    fullSized>
                    {searchButtonLabel}
                </Button>
            </div>
        </form>
    );
}

export default SearchForm;