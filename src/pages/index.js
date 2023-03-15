import React, {useEffect} from 'react';

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
