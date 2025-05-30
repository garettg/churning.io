import React from "react";
import {Card, Badge, Spinner, Avatar} from "flowbite-react";
import PropTypes from "prop-types";
import {format, formatDistanceToNow} from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {ImPriceTag, ImClock2} from 'react-icons/im';
import {TbBrandReddit} from 'react-icons/tb';

import {Config} from "../../app.config";
import {useSearchContext} from "../utils/Context";
import {gaEvent, customEvent} from "../utils/Utils";
import {BlockquoteRegEx, LinkClasses, ThreadTypes} from "../utils/Constants";
import Help from "./Help";
import Reset from "./Reset";
import Share from "./Share";
import Error from "./Error";
import Suggestion from "./Suggestion";
import Announce from "./Announce";

const ResultItem = (props) => {
    const {
        options
    } = useSearchContext();

    const handleAuthorClick = (event, comment, link) => {
        gaEvent("author", {
            category: "Author",
            label: "author",
            value: comment.author,
            nonInteraction: true
        });
        customEvent("author", {
            username: comment.author,
            resultNumber: props.resultNumber,
            thread: ThreadTypes[comment.thread].name,
            link: `https://reddit.com${link}`
        })
    }

    const handleResultClick = (event, comment, link) => {
        gaEvent("result", {
            category: "Result",
            label: "thread",
            value: comment.thread,
            nonInteraction: true
        });
        gaEvent("result", {
            category: "Result",
            label: "author",
            value: comment.author,
            nonInteraction: true
        });
        customEvent("result", {
            author: comment.author,
            resultNumber: props.resultNumber,
            thread: ThreadTypes[comment.thread].name,
            link: `https://reddit.com${link}`
        });
    }

    const redditDomain = `https://${options.oldReddit ? 'old' : 'www'}.reddit.com`;

    let permalink;
    if (props.permalink) {
        permalink = props.permalink;
    } else {
        permalink = `/comments/${props.link_id.split('_')[1]}/_/${props.id}/`
    }
    const commentLink = `${redditDomain}${permalink}?context=1`;

    let threadBadge;
    if (props.thread) {
        threadBadge = <Badge icon={ImPriceTag} color={ThreadTypes[props.thread].color} size="xs" className="pr-1.5"><span className="sr-only">Comment Thread:</span>{ThreadTypes[props.thread].name}</Badge>
    }

    let commentFormattedDate = format(new Date(props.created_utc * 1000), "M/d/yy h:mm aaa")
    let commentPosted =
        <>
            <span className="inline md:hidden">{formatDistanceToNow(new Date(props.created_utc * 1000), {addSuffix: false})}</span>
            <span className="hidden md:inline">{formatDistanceToNow(new Date(props.created_utc * 1000), {addSuffix: true})}</span>
        </>
    if (options.showDate) {
        commentPosted = commentFormattedDate;
    }

    let subredditBadge = <Badge icon={TbBrandReddit} color="success" size="xs" className="pr-1.5"><span className="sr-only">Subreddit:</span> {props.subreddit}</Badge>

    let postedBadge = <Badge icon={ImClock2} color="warning" size="xs" className="pr-1.5" title={commentFormattedDate}><span className="sr-only">Comment Posted:</span> {commentPosted}</Badge>

    let authorAvatar = <Avatar size="xs" img={`https://www.redditstatic.com/avatars/defaults/v2/avatar_default_${Math.floor(Math.random() * 8)}.png`} />

    return (
        <Card>
            <div className="flex flex-wrap items-center justify-between -mx-2 md:mx-0">
                <div className="flex flex-wrap items-center gap-3">
                    {authorAvatar}
                    <a href={`${redditDomain}/user/${props.author}`}
                       onClick={(e) => handleAuthorClick(e, props, permalink)}
                       className={`font-semibold text-base no-underline md:text-lg ${LinkClasses}`}
                       target="_blank">
                        <span className="sr-only">Comment Author:</span> {props.author}
                    </a>
                </div>
                {threadBadge}
            </div>
            <div className="-mx-2 md:mx-0">
                <a href={commentLink}
                   onClick={(e) => handleResultClick(e, props, permalink)}
                   className="block text-sm leading-snug reddit-comment text-ellipsis overflow-hidden no-underline"
                   target="_blank">
                <ReactMarkdown
                    disallowedElements={['a']}
                    remarkPlugins={[remarkGfm]}
                    unwrapDisallowed>
                    {props.body.replace(BlockquoteRegEx, "\n\n>")}
                </ReactMarkdown>
                </a>
            </div>
            <div className={`flex flex-wrap justify-${subredditBadge ? 'between':'end'} items-center -mx-2 md:mx-0`}>
                {subredditBadge}
                {postedBadge}
            </div>
        </Card>
    )
}

ResultItem.propTypes = {
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    created_utc: PropTypes.number.isRequired,
    link_id: PropTypes.string,
    id: PropTypes.string,
    permalink: PropTypes.string,
    thread: PropTypes.string,
    subreddit: PropTypes.string,
    resultNumber: PropTypes.number
}

const Results = () => {
    const {
        comments,
        allData,
        filteredCount,
        totalCount,
        searching,
        options,
        searched,
        error,
        query
    } = useSearchContext();

    if (error) {
        return <Error />;
    }

    if (searching) {
        return (
            <div className="p-8 w-full">
                <div className="flex flex-col text-center">
                    <Spinner aria-label="Searching..." size="xl" />
                </div>
            </div>
        );
    }

    if (!searched) {
        return (
            <div className="md:pt-6 px-4 md:px-6 lg:px-8 pb-6 w-full">
                <Announce />
                <Help />
            </div>

        );
    } else {
        let resultsContent;

        if (allData.length === 0 && comments.length === 0) {
            resultsContent =
                <div className="p-8 w-full">
                    <Card>
                        <div className="font-semibold text-lg text-center">
                            No Results Found
                        </div>
                    </Card>
                </div>
        } else {
            if (comments.length !== 0) {
                resultsContent = [
                    comments.map((comment, index) => <ResultItem key={index} {...comment} resultNumber={(index+1)} />),
                    <div key={9999} className="font-semibold text-center my-4">
                        End of Results
                    </div>
                ];
            }
        }

        return (
            <>
                <div id="results-top-bar" className="flex justify-between items-center px-4 py-3 border-b border-t lg:border-t-0 border-gray-200 dark:border-gray-700 bg-blue-100 dark:bg-slate-800">
                    <div id="results-title" aria-live="polite" aria-atomic="true" className="font-semibold text-lg text-gray-700 dark:text-gray-50">
                        Showing {filteredCount < totalCount ? `${filteredCount} of ` : ''}{totalCount} result{totalCount === 1 ? '':'s'}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 md:gap-4">
                        <Share />
                        <Reset />
                    </div>
                </div>
                <main id="results-list" role="region" aria-label="Search Results" className="flex-1 overflow-y-scroll py-4 px-2 md:px-6 lg:px-10 xl:px-12 space-y-6">
                    <Suggestion query={query} />
                    <div className="flex flex-col gap-4">
                        {resultsContent}
                    </div>
                </main>
                <div id="results-footer" className="flex justify-between items-center px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-center text-xs bg-blue-100 dark:bg-slate-800">
                    <div>
                        Maintained by <a href={`https://${options.oldReddit ? 'old' : 'www'}.reddit.com/user/${Config.author}`}
                                         target="_blank"
                                         className={LinkClasses}>{Config.author}</a>
                    </div>
                    <div>
                        <a href={`https://${options.oldReddit ? 'old' : 'www'}.reddit.com/message/compose/?to=${Config.author}&subject=${Config.name.replace(/\s+/g, '+')}`}
                           target="_blank"
                           className={LinkClasses}>PM with comments, suggestions, issues</a>
                    </div>
                </div>
            </>
        );
    }
}

export default Results;