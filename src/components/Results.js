import {Card, Badge, Spinner, Avatar} from "flowbite-react";
import PropTypes from "prop-types";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import format from 'date-fns/format';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {ImPriceTag, ImClock2} from 'react-icons/im';
import {TbBrandReddit} from 'react-icons/tb';

import {useSearchContext} from "../utils/Context";
import {Config} from "../../app.config";
import {LinkClasses} from "../utils/Constants";
import Help from "./Help";
import Reset from "./Reset";
import Share from "./Share";
import Error from "./Error";
import {gaEvent} from "../utils/Utils";

const ResultItem = (props) => {
    const {
        options
    } = useSearchContext();

    const handleAuthorClick = (event, author) => {
        gaEvent("author", {
            category: "Author",
            label: "author",
            value: author,
            nonInteraction: true
        });
    }

    const handleResultClick = (event, comment) => {
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
        })
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
        threadBadge = <Badge icon={ImPriceTag} color="info" size="xs"><span className="sr-only">Comment Thread:</span>{props.thread}</Badge>;
    }

    let commentPosted = formatDistanceToNow(new Date(props.created_utc * 1000), {addSuffix: true});
    if (options.showDate) {
        commentPosted = format(new Date(props.created_utc * 1000), "M/d/yy h:mm aaa");
    }

    let subredditBadge;
    if (options.addAwardTravel && props.showSub) {
        subredditBadge = <Badge icon={TbBrandReddit} color="success" size="xs"><span className="sr-only">Subreddit:</span> {props.subreddit}</Badge>
    }

    const postedBadge = <Badge icon={ImClock2} color="warning" size="xs"><span className="sr-only">Comment Posted:</span> {commentPosted}</Badge>;

    return (
        <Card>
            <div className="flex flex-wrap items-center justify-between">
                <div className="flex flex-wrap items-center gap-3">
                    <Avatar rounded={true} size="xs" />
                    <a href={`${redditDomain}/user/${props.author}`}
                       onClick={(e) => handleAuthorClick(e, props.author)}
                       className={`font-semibold text-lg ${LinkClasses}`}
                       target="_blank">
                        <span className="sr-only">Comment Author:</span> {props.author}
                    </a>
                </div>
                {postedBadge}
            </div>
            <div>
                <a href={commentLink}
                   onClick={(e) => handleResultClick(e, props)}
                   className="block text-sm leading-snug reddit-comment text-ellipsis overflow-hidden"
                   target="_blank">
                <ReactMarkdown
                    disallowedElements={['a']}
                    remarkPlugins={[remarkGfm]}
                    unwrapDisallowed>
                    {props.body}
                </ReactMarkdown>
                </a>
            </div>
            <div className={`flex flex-wrap justify-${subredditBadge ? 'between':'end'} items-center`}>
                {subredditBadge}
                {threadBadge}
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
    showSub: PropTypes.bool.isRequired
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
        error
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
        return <Help />;
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
                const subs = Array.from(new Set(comments.map((c) => c.subreddit)));
                resultsContent = [
                    comments.map((comment, index) => <ResultItem key={index} {...comment} showSub={subs.includes('awardtravel')} />),
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
                <main id="results-list" role="region" aria-label="Search Results" className="flex-1 overflow-y-scroll py-4 px-3 md:px-6 lg:px-9 xl:px-12">
                    <div className="flex flex-col gap-4">
                        {resultsContent}
                    </div>
                </main>
                <div id="results-footer" className="flex justify-between items-center px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-center text-xs bg-blue-100 dark:bg-slate-800">
                    <div>
                        Maintained by <a href={`https://${options.oldReddit ? 'old' : 'www'}.reddit.com/user/${Config.appAuthor}`}
                                         target="_blank"
                                         className={LinkClasses}>{Config.appAuthor}</a>
                    </div>
                    <div>
                        <a href={`https://${options.oldReddit ? 'old' : 'www'}.reddit.com/message/compose/?to=${Config.appAuthor}&subject=${Config.appName.replace(/\s+/g, '+')}`}
                           target="_blank"
                           className={LinkClasses}>PM with comments, suggestions, issues</a>
                    </div>
                </div>
            </>
        );
    }
}

export default Results;