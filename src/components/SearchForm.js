import {DateRange} from "react-date-range";
import {format, parseISO, subDays} from 'date-fns';
import {Label, TextInput, Select, Button, Spinner} from "flowbite-react";

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
        search,
        setState,
        searching,
    } = useSearchContext();

    const searchSubmit = async (e) => {
        // Update state
        e.preventDefault();
        search();
    };

    const handleChange = (e) => {
        setState((oldState) => ({ ...oldState, [e.target.name]: e.target.value }));
    };

    const handleRangeChange = (item) => {
        setState((oldState) => ({ ...oldState, selectionRange: item.selection }))
    }

    const timeRangeOptions = Object.entries(SearchRange).map(([key, obj], index) => {
        return (
            <option value={key} key={index}>{obj.name}</option>
        );
    });

    let searchButtonLabel = "Search"
    if (searching) {
        searchButtonLabel =
            <>
                <div className="mr-3">
                    <Spinner size="sm" light={true} />
                </div>
                Searching ...
            </>;
    }

    return (
        <form onSubmit={searchSubmit} className="flex flex-col gap-4 mt-4" role="search" aria-label="Search Form">
            <div>
                <div className="mb-1 block">
                    <Label htmlFor="query" value="Search" />
                </div>
                <TextInput
                    id="query"
                    name="query"
                    type="search"
                    required={true}
                    value={query}
                    onChange={handleChange}
                />
            </div>
            <div>
                <div className="mb-1 block">
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
                <div className="mb-1 block">
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
            <div className={`custom-date-range ${time === "" ? "block":"hidden"}`}>
                <Label htmlFor="date-range" value="Custom Time Range" className="sr-only" />
                <DateRange
                    id="date-range"
                    editableDateInputs={false}
                    onChange={(item) => handleRangeChange(item)}
                    moveRangeOnFirstSelection={false}
                    minDate={parseISO(`${Config.appSubredditDate}T00:00:00`)}
                    maxDate={new Date()}
                    ranges={[selectionRange]}
                    rangeColors={['#3182ce', '#3ecf8e', '#fed14c']}
                />
            </div>
            <div>
                <div className="mb-1 block">
                    <Label htmlFor="sort" value="Sort By" />
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
            <div className="mt-4">
                <button
                    className="text-white bg-blue-700 border border-transparent hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 disabled:hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:disabled:hover:bg-blue-600 focus:!ring-2 group flex h-min w-full items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg"
                    type="submit">
                    <span className="flex items-center rounded-md text-sm px-4 py-2">{searchButtonLabel}</span>
                </button>
            </div>
        </form>
    );
}

export default SearchForm;