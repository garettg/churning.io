import React from 'react';
import LZString from "lz-string";
import { event } from "nextjs-google-analytics";

import {Config} from "../../app.config";
import {ThreadTypes, Acronyms} from "./Constants";

export const compress = (obj) => {
    try {
        return LZString.compressToEncodedURIComponent(JSON.stringify(obj));
    } catch (e) {
        console.warn("[compress] action: warning", "\n", e, "\n", obj);
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
        console.warn("[decompress] action: warning", "\n", e, "\n", string);
        return {};
    }
}

export const isDevMode = () => {
    return !Config.hosts.includes(location.hostname);
}

export const gaEvent = (eventName, eventParams) => {
    if (!isDevMode() && Config.enableGaEvents) {
        event(eventName, eventParams);
    }
}

export const customEvent = (eventName, eventData) => {
    if (!isDevMode() && window.hasOwnProperty("woopra") && Config.enableCustomEvents) {
        try {
            window.woopra.track(eventName, eventData, () => {
                // handle successful responses
                console.log(`[event] ${eventName}: success`);
            });
        } catch (error) {
            // handle errors
            console.error(`[event] ${eventName}: failure`, `\n`, error);
        }
    }
}

export const fetchWithTimeout = async (resource, options = {}) => {
    try {
        const { timeout = 60000 } = options;

        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        const response = await fetch(resource, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const getThreadType = (permalink) => {
    for (const [key, thread] of Object.entries(ThreadTypes)) {
        if (thread.regex.test(permalink)) {
            return key;
        }
    }

    return "";
}

export const convertAcronymQuery = (query) => {
    // build object of data that has original and reverse of data, e.g. {A:B, B:A}
    const acronymData = {
        ...Acronyms,
        ...Object.fromEntries(Object.entries(Acronyms).map(a => a.reverse()))
    };

    // build regex of all the data
    const acronymRegEx = new RegExp(`\\b(${Object.entries(acronymData).map(entry => `${entry[0]}`).join("|")})\\b`, "gi");

    return query.toLowerCase().replace(acronymRegEx, match => {
        if (acronymData.hasOwnProperty(match)) {
            let matched = match;
            let converted = acronymData[match];

            return `("${matched}" OR "${converted}")`;
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

export const woopraInitialize = () => {
    !function () {
        var t, o, c, e = window, n = document, r = arguments, a = "script",
            i = ["call", "cancelAction", "config", "identify", "push", "track", "trackClick", "trackForm", "update", "visit"],
            s = function () {
                var t, o = this, c = function (t) {
                    o[t] = function () {
                        return o._e.push([t].concat(Array.prototype.slice.call(arguments, 0))), o
                    }
                };
                for (o._e = [], t = 0; t < i.length; t++) c(i[t])
            };
        for (e.__woo = e.__woo || {}, t = 0; t < r.length; t++) e.__woo[r[t]] = e[r[t]] = e[r[t]] || new s;
        (o = n.createElement(a)).async = 1, o.src = "https://static.woopra.com/js/w.js", (c = n.getElementsByTagName(a)[0]).parentNode.insertBefore(o, c)
    }("woopra");

    if (window.hasOwnProperty("woopra")) {
        window.woopra.config({
            domain: Config.domain
        });
    }
}