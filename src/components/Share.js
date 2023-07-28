import React from 'react';
import {Button} from "flowbite-react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import toast, { Toaster } from "react-hot-toast";
import classNames from "classnames";
import {FiShare} from "react-icons/fi";
import {MdOutlineClose} from "react-icons/md";
import {differenceInDays, endOfDay, startOfDay, toDate, parseISO} from "date-fns";

import styles from "../styles/Share.module.css";

import {useSearchContext} from "../utils/Context";
import {decompress, gaEvent, customEvent} from "../utils/Utils";
import {KeywordsRegex} from "../utils/Constants";
import {Config} from "../../app.config";

// https://dev.to/franciscomendes10866/how-to-create-a-notificationtoast-using-react-and-tailwind-545o
const Share = () => {
    const {
        shareUrl,
        totalCount
    } = useSearchContext();

    const onSuccess = () => {
        toast.custom(
            (t) => (
                <div
                    className={classNames([
                        styles.notificationWrapper,
                        t.visible ? "top-0" : "-top-96",
                    ])}
                >
                    <div className={styles.iconWrapper}>
                        <FiShare />
                    </div>
                    <div className={styles.contentWrapper}>
                        <h1>Share Link Copied</h1>
                        <p>You may now paste the link where needed.</p>
                    </div>
                    <div className={styles.closeIcon} onClick={() => toast.dismiss(t.id)}>
                        <MdOutlineClose />
                    </div>
                </div>
            ),
            { id: "share-notification", position: "top-center" }
        );
        let urlHash = shareUrl.split("#")[1];
        let formData = decompress(urlHash);
        gaEvent("share", {
            category: "Share",
            label: "share",
            value: formData.query,
            nonInteraction: true
        });

        let {selectionRange: _, ...rest} = formData;
        let eventData = Object.assign({}, rest, {
            time: rest.time !== "" ? (
                rest.time !== "all" ? rest.time : (differenceInDays(endOfDay(new Date()), startOfDay(toDate(parseISO(Config.subreddits[rest.subreddit])))) + 1)
            ) : (differenceInDays(endOfDay(formData.selectionRange.endDate), startOfDay(formData.selectionRange.startDate)) + 1),
            keywords: formData.query.replace(KeywordsRegex, ' ').trim().replace(/\s+/g, ',').toLowerCase(),
            resultCount: totalCount
        });

        customEvent("share", eventData);
    }

    return (
        <>
            <CopyToClipboard
                text={shareUrl}
                onCopy={onSuccess}>
                <Button
                    color="blue"
                    size="xs"
                    aria-label="Share Search Results"
                    title="Share Search Results">
                    <FiShare className="md:mr-2 h-4 w-4" />
                    <span className="hidden md:inline">Share</span>
                </Button>
            </CopyToClipboard>
            <Toaster />
        </>
    )
}

export default Share;