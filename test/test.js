const {assert}  = require('chai');
const {convertAcronymQuery, testMatches} = require('../src/utils/Utils');
const {DisqualifyAcronymsCharacters, Suggestions} = require('../src/utils/Constants');


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