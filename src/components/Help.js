import React from 'react';

const Help = () => {
    return (
        <table className="table-auto text-sm mx-auto">
            <thead>
                <tr>
                    <th className="px-4 py-2 text-left">Field</th>
                    <th className="px-4 py-2 text-left">Options</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border px-4 py-2 align-top whitespace-nowrap font-bold border-gray-200 dark:border-gray-700">Search</td>
                    <td className="border px-4 py-2 align-top border-gray-200 dark:border-gray-700">
                        <dl>
                            <dt className="font-bold">General Advice</dt>
                            <dd className="pl-4">
                                <p>Search queries should be at least 3 characters long. Common language words could be ignored. Acronyms of 3 letters or more are more likely to produce results, 2 letter acronyms will most likely be filtered out. Variations and pluralizations of words will be found.</p>
                                <p className="italic">Example: "save" can return results that contain "saving"</p>
                                <p className="italic">Example: "bank bonus" can return results that contain "bank", "banks", "bonus", or "bonuses"</p>
                            </dd>
                            <dt className="mt-2 font-bold">Multiple terms</dt>
                            <dd className="pl-4">
                                <p>Using words separated using a space should be an "AND" search (includes both words)</p>
                                <p className="italic">Example: chase sapphire</p>
                                <p>Using words separated with an "OR" should find either</p>
                                <p className="italic">Example: chase or amex</p>
                            </dd>
                            <dt className="mt-2 font-bold">Negation</dt>
                            <dd className="pl-4">
                                <p>To find comments that match one word but not another word, use a "-" before the word you wish to exclude.</p>
                                <p className="italic">Example: chase -sapphire</p>
                            </dd>
                            <dt className="mt-2 font-bold">Exact Phrase</dt>
                            <dd className="pl-4">
                                <p>If you wanted to find an exact phrase, you can put the phrase in quotation marks.</p>
                                <p className="italic">Example: "amex gold"</p>
                            </dd>
                        </dl>
                    </td>
                </tr>
                <tr>
                    <td className="border px-4 py-2 align-top whitespace-nowrap font-bold border-gray-200 dark:border-gray-700">Author</td>
                    <td className="border px-4 py-2 align-top border-gray-200 dark:border-gray-700">
                        <p>This parameter will restrict the search to specific Reddit authors.</p>
                    </td>
                </tr>
                <tr>
                    <td className="border px-4 py-2 align-top whitespace-nowrap font-bold border-gray-200 dark:border-gray-700">Sort By</td>
                    <td className="border px-4 py-2 align-top border-gray-200 dark:border-gray-700">
                        <p>Select a sort order by date, options are newest and oldest.</p>
                    </td>
                </tr>
                <tr>
                    <td className="border px-4 py-2 align-top whitespace-nowrap font-bold border-gray-200 dark:border-gray-700">Subreddit</td>
                    <td className="border px-4 py-2 align-top border-gray-200 dark:border-gray-700">
                        <p>Select a subreddit to search of multiple options.</p>
                    </td>
                </tr>
                <tr>
                    <td className="border px-4 py-2 align-top whitespace-nowrap font-bold border-gray-200 dark:border-gray-700">Time Range</td>
                    <td className="border px-4 py-2 align-top border-gray-200 dark:border-gray-700">
                        <p>Select a time range from the dropdown. Options include:</p>
                        <ul className="list-inside list-disc px-4 my-3">
                            <li>1 day</li>
                            <li>1 week</li>
                            <li>1 month</li>
                            <li>3 months</li>
                            <li>6 months</li>
                            <li>1 year</li>
                            <li>2 years</li>
                            <li>All</li>
                            <li>Custom</li>
                        </ul>
                        <p>Custom allows a date range to be selected via calendar widget.</p>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Help;