const {assert}  = require('chai');
const {getUnixTime, endOfDay, parseISO, startOfDay} = require('date-fns');
const {Config} = require('../app.config');
const {PushshiftAPI, ApiSources, ApiModes, ArcticShiftStartUnix} = require('../src/utils/Api');
const {convertAcronymQuery, testMatches} = require('../src/utils/Utils');
const {DisqualifyAcronymsCharacters, Suggestions} = require('../src/utils/Constants');

const api = new PushshiftAPI();

const getCustomRangeFormData = (startDate, endDate) => ({
    query: "amex",
    author: "",
    time: "",
    selectionRange: {
        startDate: parseISO(`${startDate}T00:00:00`),
        endDate: parseISO(`${endDate}T00:00:00`),
        key: "selection"
    },
    sort: "desc",
    limit: 100,
    subreddit: "churning"
});

const withConfigApi = (configApi, test) => {
    const originalApi = Config.api;

    try {
        Config.api = configApi;
        test();
    } finally {
        Config.api = originalApi;
    }
};


/**
 * Mock Test Data
 * query = sample input that might be used in search
 * convert = expected output of converting a query to acronym search
 * matches = boolean as to whether query should match a suggestion
 */
const queries = [
    {query:`amex au`, convert:`("amex" OR "american express") ("au" OR "authorized user")`, matches: false},
    {query:`american express authorized user`, convert:`("american express" OR "amex") ("authorized user" OR "au")`, matches: false},
    {query:`american express annual fee success`, convert:`("american express" OR "amex") ("annual fee" OR "af") success`, matches: false},
    {query:`chase 5/24`, convert:`chase 5/24`, matches: true},
    {query:`does amex allow au`, convert:`does ("amex" OR "american express") allow ("au" OR "authorized user")`, matches: false},
    {query:`mdd`, convert:`("mdd" OR "modified double dip")`, matches: true},
    {query:`(sapphire OR csp)`, convert:`(sapphire OR csp)`, matches: true},
    {query:`csr pc`, convert:`("csr" OR "sapphire reserve") ("pc" OR "product change")`, matches: true},
    {query:`chase sapphire reserve product change`, convert:`chase ("sapphire reserve" OR "csr") ("product change" OR "pc")`, matches: true},
    {query:`MDD+success`, convert:`MDD+success`, matches: true},
    {query:`biz plat retention`, convert:`("biz" OR "business") ("plat" OR "platinum") retention`, matches: false},
    {query:`(ink OR cip OR ciu OR cic) multiple`, convert:`(ink OR cip OR ciu OR cic) multiple`, matches: false},
    {query:`Amex cc 2/90`, convert:`("amex" OR "american express") ("cc" OR "credit card") 2/90`, matches: true},
    {query:`SW CP`, convert:`("sw" OR "southwest") ("cp" OR "companion pass")`, matches: true},
    {query:`"as cp"`, convert:`"as cp"`, matches: true},
    {query:`amex plat retention -biz`, convert:`("amex" OR "american express") ("plat" OR "platinum") retention -("biz" OR "business")`, matches: false},
    {query:`flyertalk united amex airline credit`, convert:`("flyertalk" OR "ft") ("united" OR "ua") ("amex" OR "american express") airline credit`, matches: false},
    {query:`barclay aa biz`, convert:`("barclay" OR "barclays") ("aa" OR "american airlines") ("biz" OR "business")`, matches: false}
]

describe('Test - Query to Acronym Query', () => {
    for (let i = 0; i < queries.length; ++i) {
        let test = queries[i];

        it(test.query + " -> " + test.convert, () => {
            if (DisqualifyAcronymsCharacters.test(test.query)) {
                assert.equal(test.query, test.convert);
            } else {
                assert.equal(convertAcronymQuery(test.query), test.convert);
            }
        });
    }
});

describe('Test - Suggestion Matches', () => {
    for (let i = 0; i < queries.length; ++i) {
        let test = queries[i];

        it(test.query + " -> " + (test.matches ? "HAS SUGGESTIONS":"NO SUGGESTIONS"), () => {
            const suggestion = Suggestions.find(suggestion => {
                return testMatches(test.query, suggestion.matches);
            })

            assert.equal(!!suggestion, test.matches);
        });
    }
});

describe('Test - API Date Routing', () => {
    it('uses PullPush only when the range ends before May 19 2025', () => {
        withConfigApi(ApiModes.AUTO, () => {
            const formData = getCustomRangeFormData("2025-05-17", "2025-05-18");
            const requests = api.getSearchRequests(formData);

            assert.deepEqual(requests.map((request) => request.api), [ApiSources.PULLPUSH]);
            assert.equal(requests[0].after, getUnixTime(startOfDay(formData.selectionRange.startDate)));
            assert.equal(requests[0].before, getUnixTime(endOfDay(formData.selectionRange.endDate)));
        });
    });

    it('uses Arctic Shift only when the range starts on May 19 2025', () => {
        withConfigApi(ApiModes.AUTO, () => {
            const formData = getCustomRangeFormData("2025-05-19", "2025-05-20");
            const requests = api.getSearchRequests(formData);

            assert.deepEqual(requests.map((request) => request.api), [ApiSources.ARCTICSHIFT]);
            assert.equal(requests[0].after, ArcticShiftStartUnix);
            assert.equal(requests[0].before, getUnixTime(endOfDay(formData.selectionRange.endDate)));
        });
    });

    it('splits searches across PullPush and Arctic Shift when the range crosses May 19 2025', () => {
        withConfigApi(ApiModes.AUTO, () => {
            const formData = getCustomRangeFormData("2025-05-18", "2025-05-20");
            const requests = api.getSearchRequests(formData);

            assert.deepEqual(requests.map((request) => request.api), [ApiSources.PULLPUSH, ApiSources.ARCTICSHIFT]);
            assert.equal(requests[0].after, getUnixTime(startOfDay(formData.selectionRange.startDate)));
            assert.equal(requests[0].before, ArcticShiftStartUnix - 1);
            assert.equal(requests[1].after, ArcticShiftStartUnix);
            assert.equal(requests[1].before, getUnixTime(endOfDay(formData.selectionRange.endDate)));
        });
    });

    it('uses only PullPush for the full range when Config.api is pullpush', () => {
        withConfigApi(ApiSources.PULLPUSH, () => {
            const formData = getCustomRangeFormData("2025-05-18", "2025-05-20");
            const requests = api.getSearchRequests(formData);

            assert.deepEqual(requests.map((request) => request.api), [ApiSources.PULLPUSH]);
            assert.equal(requests[0].after, getUnixTime(startOfDay(formData.selectionRange.startDate)));
            assert.equal(requests[0].before, getUnixTime(endOfDay(formData.selectionRange.endDate)));
        });
    });

    it('uses only Arctic Shift for the full range when Config.api is arcticshift', () => {
        withConfigApi(ApiSources.ARCTICSHIFT, () => {
            const formData = getCustomRangeFormData("2025-05-18", "2025-05-20");
            const requests = api.getSearchRequests(formData);

            assert.deepEqual(requests.map((request) => request.api), [ApiSources.ARCTICSHIFT]);
            assert.equal(requests[0].after, getUnixTime(startOfDay(formData.selectionRange.startDate)));
            assert.equal(requests[0].before, getUnixTime(endOfDay(formData.selectionRange.endDate)));
        });
    });
});

describe('Test - API Query Construction', () => {
    it('does not expand acronyms for PullPush searches', () => {
        const formData = getCustomRangeFormData("2025-05-17", "2025-05-18");
        const url = new URL(api.constructUrl(formData, {}, {
            api: ApiSources.PULLPUSH,
            after: 1,
            before: 2
        }));

        assert.equal(url.searchParams.get("q"), "amex");
    });

    it('keeps acronym expansion enabled for Arctic Shift searches', () => {
        const formData = getCustomRangeFormData("2025-05-19", "2025-05-20");
        const url = new URL(api.constructUrl(formData, {}, {
            api: ApiSources.ARCTICSHIFT,
            after: 1,
            before: 2
        }));

        assert.equal(url.searchParams.get("body"), '("amex" OR "american express")');
    });
});

describe('Test - API Result Merge', () => {
    it('deduplicates merged results and keeps PullPush data first for duplicate comments', () => {
        const results = api.mergeResults([
            {
                api: ApiSources.ARCTICSHIFT,
                data: [
                    { id: "duplicate", author: "arctic", body: "arctic shift result", created_utc: 2 },
                    { id: "arctic-only", author: "arctic", body: "arctic shift only", created_utc: 3 }
                ]
            },
            {
                api: ApiSources.PULLPUSH,
                data: [
                    { id: "duplicate", author: "pullpush", body: "pullpush result", created_utc: 2 }
                ]
            }
        ], 100, "desc");

        assert.equal(results.length, 2);
        assert.equal(results.find((result) => result.id === "duplicate").body, "pullpush result");
        assert.deepEqual(results.map((result) => result.id), ["arctic-only", "duplicate"]);
    });
});
