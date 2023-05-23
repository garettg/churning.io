import React, {useEffect} from 'react';

import {Alert, Button} from "flowbite-react";
import {IoWarningOutline} from "react-icons/io5";
import {HiEye} from "react-icons/hi2";

import {Config} from "../../app.config";
import Options from "../components/Options";
import SearchForm from "../components/SearchForm";
import Results from "../components/Results";
import Facets from "../components/Facets";
import {woopraInitialize} from "../utils/Utils";

export default function Home() {
    if (Config.enableCustomEvents) {
        useEffect(() => {
            woopraInitialize();
        }, []);
    }

    if (Config.disableSearch) {
        return (
            <div className="container mx-auto text-gray-700 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 dark:text-gray-100 p-4 md:p-8 lg:p-12">
                <div className="">
                    <Alert
                        color="warning"
                        icon={IoWarningOutline}
                        additionalContent={
                            <>
                                <div className="mb-3 text-sm">
                                    <p>Due to Pushshift being cut off from the Reddit API, they have shut off their own API. The only communication at this point from Pushshift is
                                        "Check back in the next few weeks for updates."</p>
                                    <p className="mt-2">So until further notice, Churning Search is unavailable. Once Pushshift determines/announces their path forward, it will be decided how
                                        Churning Search will proceed. All announcements regarding Churning Search will be posted in the Daily Discussion thread and here.</p>
                                    <p className="mt-2"><strong className="font-medium">Search Help:</strong> <a className="underline" href="https://www.google.com/search?q=site%3Areddit.com%2Fr%2Fchurning">Try 
                                        using google with the "site" operator</a>.</p>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <Button
                                        color="warning"
                                        href="https://reddit.com/r/churning/comments/13lpwno/daily_discussion_thread_may_19_2023/jkvb7fs/?context=3"
                                        target="_blank"
                                        size="xs"
                                        pill>
                                        <HiEye className="-ml-0.5 mr-2 h-4 w-4" /> More info
                                    </Button>
                                </div>
                            </>
                        }
                        rounded>
                        <h4 className="text-lg md:text-xl lg:text-2xl font-medium font-mono tracking-tighter">Churning Search Unavailable</h4>
                    </Alert>
                </div>
            </div>
        );
    } else {
        return (
            <div className="lg:h-screen lg:min-h-screen lg:h-screen-ios lg:min-h-screen-ios lg:flex text-gray-700 dark:text-gray-100">
                <div id="search-form-panel" className="md:flex lg:block lg:w-2/6 xl:w-1/4 p-4 overflow-y-scroll bg-blue-200 dark:bg-slate-900 border-r border-gray-200 dark:border-gray-700 shadow-lg">
                    <div className="md:w-1/2 lg:w-full md:pr-4 lg:pr-0">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl text-gray-700 dark:text-gray-100 font-mono tracking-tighter">{Config.appName}</h1>
                            <Options />
                        </div>
                        <SearchForm />
                    </div>
                    <Facets />
                </div>
                <div id="results-panel" className="mt-8 lg:mt-0 flex flex-1 flex-col bg-white dark:bg-slate-900 overflow-y-scroll">
                    <Results />
                </div>
            </div>
        );
    }
}
