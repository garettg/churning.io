import {CopyToClipboard} from 'react-copy-to-clipboard';
import {FiShare} from "react-icons/fi";
import {MdOutlineClose} from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import classNames from "classnames";

import styles from "../styles/Share.module.css";

import {useSearchContext} from "../utils/Context";
import {ButtonClasses} from "../utils/Constants";
import {decompress, gaEvent} from "../utils/Utils";

// https://dev.to/franciscomendes10866/how-to-create-a-notificationtoast-using-react-and-tailwind-545o
const Share = () => {
    const {
        shareUrl
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
    }

    return (
        <>
            <CopyToClipboard
                text={shareUrl}
                onCopy={onSuccess}>
                <button
                    type="button"
                    aria-label="Share Search Results"
                    title="Share Search Results"
                    className={`${ButtonClasses} text-xs`}>
                    <FiShare className="md:mr-2 h-5 w-5" />
                    <span className="hidden md:inline">Share</span>
                </button>
            </CopyToClipboard>
            <Toaster />
        </>
    )
}

export default Share;