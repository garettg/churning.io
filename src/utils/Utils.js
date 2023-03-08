import React from 'react';
import LZString from "lz-string";
import { event } from "nextjs-google-analytics";

import {Config} from "../../app.config";
import {ThreadTypes, Acronyms} from "./Constants";

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

export const getAuthorData = async (author) => {
    const response = await fetch(`https://api.reddit.com/user/${author}/about`);
    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }
    const user = await response.json();
    return user.data;
}

export const hasWhiteSpace = (string) => {
    return (/\s/).test(string);
}

export const convertAcronymQuery = (query) => {
    // build object of data that has original and reverse of data, e.g. {A:B, B:A}
    const acronymData = {
        ...Acronyms,
        ...Object.fromEntries(Object.entries(Acronyms).map(a => a.reverse()))
    };

    // build regex of all the data
    const acronymRegEx = new RegExp(`\\b(${Object.entries(acronymData).map(entry => `${entry[0]}`).join("|")})\\b`, "gi");

    return query.toLowerCase().replace(acronymRegEx, (match, key) => {
        if (acronymData.hasOwnProperty(match)) {
            let matched = hasWhiteSpace(match) ? `"${match}"` : match;
            let converted = hasWhiteSpace(acronymData[match]) ? `"${acronymData[match]}"` : acronymData[match];

            return `(${matched}|${converted})`;
        } else {
            return match;
        }
    });
}

export const testMatches = (query, matches) => {
    return (
        matches.every(match => {
            const regEx = new RegExp(`\\b(${match})\\b`, "gi");
            return regEx.test(query.toLowerCase())
        })
    );
}