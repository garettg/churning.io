// import css file
import "../styles/index.scss";

import {useEffect, useState} from "react";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleAnalytics, event } from "nextjs-google-analytics";
import { ThemeProvider } from 'next-themes'

import {Config} from "../../app.config";
import {SearchContextProvider} from "../utils/Context";

export function reportWebVitals({ id, name, label, value }) {
    event(name, {
        category: label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
        value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
        label: id, // id unique to current page load
        nonInteraction: true, // avoids affecting bounce rate.
    });
}

const client = new QueryClient();

export default function App({ Component, pageProps }) {

    const [showChild, setShowChild] = useState(false);
    useEffect(() => {
        setShowChild(true);
    }, []);

    if (!showChild) {
        return null;
    }

    if (typeof window === 'undefined') {
        return <></>;
    } else {
        return (
            <>
                <Head>
                    <title>{Config.appName}</title>
                    <link rel="shortcut icon" href="favicon.ico"/>
                    <link rel="apple-touch-icon" sizes="180x180" href="icons/apple-touch-icon.png"/>
                    <link rel="icon" type="image/svg+xml" href="icons/favicon.svg"/>
                    <link rel="alternate icon" type="image/png" sizes="32x32" href="icons/favicon-32x32.png"/>
                    <link rel="alternate icon" type="image/png" sizes="16x16" href="icons/favicon-16x16.png"/>
                    <link rel="alternate shortcut icon" href="icons/favicon.ico"/>
                    <link rel="manifest" href="icons/site.webmanifest"/>
                    <meta name="msapplication-TileColor" content="#2d89ef"/>
                    <meta name="msapplication-config" content="/public/icons/browserconfig.xml"/>
                    <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)"/>
                    <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)"/>
                </Head>
                <div className="app-root">
                    <GoogleAnalytics gaMeasurementId={Config.appAnalyticsId} trackPageViews={{ignoreHashChange: true}}/>
                    <QueryClientProvider client={client}>
                        <SearchContextProvider>
                            <ThemeProvider attribute="class">
                                <Component {...pageProps} />
                            </ThemeProvider>
                        </SearchContextProvider>
                    </QueryClientProvider>
                </div>
            </>
        );
    }
}
