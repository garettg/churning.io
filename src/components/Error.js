import React from 'react';
import {Alert} from "flowbite-react";
import {BiErrorAlt, BiError} from "react-icons/bi";

import {Config} from "../../app.config";
import {useSearchContext} from "../utils/Context";

const Error = () => {
    const {
        options,
        error
    } = useSearchContext();

    const errorMessage = error.message ?? "An unknown error has occurred. Please try again later.";

    if (errorMessage === "Timeout. Maybe slow down a bit") {
        const additionalContent =
            <div className="mt-4 text-yellow-800 dark:text-yellow-800">
                <p className="text-xl font-bold mb-6">{errorMessage}</p>
                <p className="text-base">Try narrowing your time range on the search or add more words to your search query and search again. You might also be searching too many times slow down a little bit.</p>
            </div>

        return (
            <div className="p-12 w-full">
                <Alert
                    color="warning"
                    icon={BiError}
                    additionalContent={additionalContent}>
                    <h2 className="text-2xl font-semibold text-yellow-800 dark:text-yellow-800">Your search might be too broad</h2>
                </Alert>
            </div>
        )
    } else {
        const additionalContent =
            <div className="mt-4 text-red-800 dark:text-red-800">
                <p className="text-xl font-bold mb-6">{errorMessage}</p>
                <p className="text-base mb-3">There is probably an issue with API that provides the search results data.</p>
                <p className="text-base">In the meantime, you can use this <a href={`https://www.google.com/search?q=site:reddit.com/r/${Config.defaultSubreddit}`} className="underline font-semibold" target="_blank">Google search query</a> to help find
                    what you are looking for, just add your search to the existing text that helps narrow the search to the {Config.defaultSubreddit} subreddit.</p>
            </div>

        return (
            <div className="p-12 w-full">
                <Alert
                    color="failure"
                    icon={BiErrorAlt}
                    additionalContent={additionalContent}>
                    <h2 className="text-2xl font-semibold text-red-800 dark:text-red-800">An Error Has Occurred</h2>
                </Alert>
            </div>
        )
    }
}

export default Error;