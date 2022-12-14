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
                    rangeColors={['#3182ce', '#3ecf8e', '#fed14c']}
                />
            </div>
            <div>
                <div className="lg:mb-1">
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
                <Button
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