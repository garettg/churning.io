import React, {useState} from 'react';
import Head from "next/head";
import Link from "next/link";
import {Alert, Button, Label, Spinner, TextInput} from "flowbite-react";

import {Config} from "../../app.config";
import {DataAPI} from "../utils/Api";

const api = new DataAPI();

export default function Karma() {
    const [username, setUsername] = useState("");
    const [result, setResult] = useState(null);
    const [progress, setProgress] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setResult(null);
        setProgress(null);
        setError("");

        try {
            const karma = await api.getSubredditCommentKarma(username, setProgress);
            setResult(karma);
        } catch (requestError) {
            setError(requestError.message || "Unable to calculate karma.");
        } finally {
            setLoading(false);
        }
    };

    const redditUsername = result ? encodeURIComponent(result.username) : "";

    return (
        <>
            <Head>
                <title>Churning Karma Calculator</title>
            </Head>
            <main className="min-h-dvh bg-white p-4 text-gray-700 dark:bg-slate-900 dark:text-gray-100 md:p-8">
                <div className="mx-auto w-full max-w-2xl">
                    <h1 className="mt-6 text-2xl font-medium">Churning Karma Calculator</h1>
                    <div>
                        <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                            Add up the archived score of a Reddit user&apos;s comments in r/{Config.defaultSubreddit}.
                            Scores are from Arctic Shift archive, so scores could vary slightly from Reddit live score.
                            This tool is purely for estimate purposes and should not be considered exact for referral
                            subreddit counting.
                        </p>
                    </div>
                    <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-3 mt-3 mx-3 rounded" role="alert">
                        <p className="font-bold text-sm">Warning</p>
                        <p className="text-xs">You may see &quot;Timeout. Maybe slow down a bit&quot; errors. Trying Calculate again after a few attempts will usually work.</p>
                    </div>

                    <form className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end" onSubmit={handleSubmit}>
                        <div className="w-full">
                            <Label htmlFor="karma-username">Reddit Username</Label>
                            <TextInput
                                id="karma-username"
                                name="username"
                                placeholder="username"
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                disabled={loading}
                                required
                            />
                        </div>
                        <Button color="blue" type="submit" disabled={loading} className="sm:min-w-36">
                            {loading ? (
                                <>
                                    <Spinner className="mr-2" size="sm" light/>
                                    Calculating...
                                </>
                            ) : "Calculate"}
                        </Button>
                    </form>

                    {loading && progress && (
                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300" role="status">
                            Checked {progress.commentCount.toLocaleString()} comments
                            across {progress.pageCount.toLocaleString()} pages...
                        </p>
                    )}

                    {error && (
                        <Alert className="mt-6" color="failure">
                            {error}
                        </Alert>
                    )}

                    {result && (
                        <section className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700" aria-live="polite">
                            <div className="flex flex-wrap items-baseline justify-between gap-3">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">r/{result.subreddit} comment
                                        karma</p>
                                    <p className="mt-1 text-4xl font-semibold tabular-nums">
                                        {result.totalScore.toLocaleString()}
                                    </p>
                                </div>
                                <a
                                    className="text-blue-700 hover:underline dark:text-blue-400"
                                    href={`https://www.reddit.com/user/${redditUsername}/comments/`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View Reddit comments
                                </a>
                            </div>
                            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                                Based on {result.commentCount.toLocaleString()} archived comments.
                            </p>
                        </section>
                    )}
                </div>
            </main>
        </>
    );
}
