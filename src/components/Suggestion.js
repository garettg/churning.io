import React from 'react';
import PropTypes from "prop-types";
import {Alert, Button} from "flowbite-react";
import {FaBookOpen} from "react-icons/fa";
import {HiEye} from "react-icons/hi2";

import {Suggestions} from "../utils/Constants";
import {testMatches, gaEvent} from "../utils/Utils";
import {useSearchContext} from "../utils/Context";

const Suggestion = (props) => {
    const {
        options
    } = useSearchContext();

    const onClick = (name, query) => {
        gaEvent("suggestion", {
            category: "Suggestion",
            label: name,
            value: query,
            nonInteraction: true
        });
    }

    if (props.query && options.showSuggestions) {
        const matches = Suggestions.filter(suggestion => testMatches(props.query, suggestion.matches));

        if (matches.length) {
            let suggestionComponents = matches.map((suggestion, index) => {
                const additionalContent =
                    <>
                        <div className="mt-1 mb-3 text-sm">Looking for {suggestion.name} information? Here is a resource that might help.</div>
                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                href={suggestion.link}
                                onClick={() => onClick(suggestion.name, props.query)}
                                target="_blank"
                                color="teal"
                                size="xs"
                                pill>
                                <HiEye className="-ml-0.5 mr-2 h-4 w-4" /> View more
                            </Button>
                        </div>
                    </>;

                return (
                    // mx-auto w-5/6 md:w-2/3 xl:w-1/2
                    <Alert
                        key={index}
                        color="teal"
                        withBorderAccent
                        icon={FaBookOpen}
                        additionalContent={additionalContent}
                        className="shadow-md"
                    >
                        <h3 className="text-lg font-medium leading-tight">{suggestion.name}</h3>
                    </Alert>
                )
            });

            let gridColumns;
            switch (suggestionComponents.length) {
                case 2:
                case 4:
                    gridColumns = 2;
                    break;
                case 3:
                    gridColumns = 3;
                    break;
                default:
                    gridColumns = 1;
            }

            return (
                <div className={`gap-4 grid grid-cols-1 xl:grid-cols-${gridColumns}`}>
                    {suggestionComponents}
                </div>
            )
        }
    }

    return null;
}

Suggestion.propTypes = {
    query: PropTypes.string.isRequired
}

export default Suggestion;