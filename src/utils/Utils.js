import React from 'react';
import LZString from "lz-string";
import { event } from "nextjs-google-analytics";

import {Config} from "../../app.config";
import {ThreadTypes} from "./Constants";

export const compress = (obj) => {
    try {
        return LZString.compressToEncodedURIComponent(JSON.stringify(obj));
    } catch (e) {
        console.log("Utils: compress did not happen", "\n", e, "\n", obj);
        return "";
    }
}

export const decompress = (string) => {
    try {
        const decompressedEscaped = LZString.decompressFromEncodedURIComponent(string);
        const decompressed = decodeURIComponent(decompressedEscaped);
        if (decompressedEscaped) {
            return JSON.parse(decompressed);
        } else {
            return {};
        }
    } catch (e) {
        console.log("Utils: decompress did not happen", "\n", e, "\n", string);
        return {};
    }
}

export const isDevMode = () => {
    return !Config.appHosts.includes(location.hostname);
}

export const gaEvent = (eventName, eventParams) => {
    if (!isDevMode()) {
        event(eventName, eventParams, Config.appAnalyticsId);
    }
}

export const fetchWithTimeout = async (resource, options = {}) => {
    const { timeout = 60000 } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {
        ...options,
        signal: controller.signal
    });
    clearTimeout(id);
    return response;
}

export const getThreadType = (permalink) => {
    for (const [key, thread] of Object.entries(ThreadTypes)) {
        if (thread.regex.test(permalink)) {
            return key;
        }
    }

    return "";
}