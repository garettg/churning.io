import React from 'react';
import {Alert} from "flowbite-react";
import {BiErrorAlt} from "react-icons/bi";

import {Config} from "../../app.config";
import {useSearchContext} from "../utils/Context";

const Error = () => {
    const {
        options
    } = useSearchContext();

    const additionalContent =
        <div className="mt-4 text-red-700 dark:text-red-800">
            <p className="text-base">There is probably an issue with <a href="https://search.pullpush.io/" className="underline" target="_blank">pullpush.io</a> which is where the results come from. Things you can try:</p>
            <ul className="list-inside list-disc px-4 my-3 leading-loose text-sm">
                <li>Try going to <a href="https://search.pullpush.io/" className="underline" target="_blank">pullpush.io</a>. If it does not load, then {Config.name} will not work.</li>
                <li>If <a href="https://search.pullpush.io/" className="underline" target="_blank">pullpush.io</a> loads, try searching. If it does not return results for any type of search, then {Config.name} will not work.</li>
                <li>If everything on <a href="https://search.pullpush.io/" className="underline" target="_blank">pullpush.io</a> is working normally, then feel free
                    to <a href={`https://${options.oldReddit ? 'old' : 'www'}.reddit.com/message/compose/?to=${Config.author}&subject=${Config.name.replace(/\s+/g, '+')}+Error`} target="_blank" className="underline">report</a> the issue.</li>
            </ul>
        </div>

    return (
        <div className="p-12 w-full">
            <Alert
                color="failure"
                icon={BiErrorAlt}
                additionalContent={additionalContent}>
                <h2 className="text-2xl font-medium text-red-700 dark:text-red-800">An Error Has Occurred</h2>
            </Alert>
        </div>
    )
}

export default Error;