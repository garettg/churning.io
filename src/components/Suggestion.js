import React from 'react';
import PropTypes from "prop-types";
import {Alert, Button} from "flowbite-react";
import {FaBookOpen} from "react-icons/fa";
import {HiEye} from "react-icons/hi2";

import {KeywordsRegex, Suggestions} from "../utils/Constants";
import {testMatches, gaEvent, customEvent} from "../utils/Utils";
import {useSearchContext} from "../utils/Context";

const Suggestion = (props) => {
    const {
        options,
        totalCount
    } = useSearchContext();

    const onClick = (name, query) => {
        gaEvent("suggestion", {
            category: "Suggestion",
            label: name,
            value: query,
            nonInteraction: true
        });
        customEvent("suggestion", {
            suggest: name,
            query: query,
            keywords: query.replace(KeywordsRegex, ' ').trim().replace(/\s+/g, ',').toLowerCase(),
            resultCount: totalCount
        });
    }

    if (props.query && options.showSuggestions) {
        const matches = Suggestions.filter(suggestion => testMatches(props.query, suggestion.matches));

        if (matches.length) {
            let suggestionComponents = matches.map((suggestion, index) => {
                let comments = `Looking for ${suggestion.name} information? Here is a resource that might help.`;
                if (suggestion.hasOwnProperty("comments") && suggestion.comments.trim() !== "") {
                    comments = suggestion.comments;
                }

                let color = "teal";
                if (suggestion.hasOwnProperty("color") && suggestion.color.trim() !== "") {
                    color = suggestion.color;
                }

                let icon = FaBookOpen;
                if (suggestion.hasOwnProperty("icon") && suggestion.icon) {
                    icon = suggestion.icon;
                }

                const additionalContent =
                    <>
                        <div className="mt-1 mb-3 text-sm">{comments}</div>
                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                href={suggestion.link}
                                onClick={() => onClick(suggestion.name, props.query)}
                                target="_blank"
                                color={color}
                                size="xs"
                                pill>
                                <HiEye className="-ml-0.5 mr-2 h-4 w-4" /> View more
                            </Button>
                        </div>
                    </>;

                return (
                    <Alert
                        key={index}
                        color={color}
                        withBorderAccent
                        icon={icon}
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