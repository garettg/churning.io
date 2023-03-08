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
    {query:`american express annual fee success`, convert:`("american express"|amex) ("annual fee"|af) success`, matches: false},
    {query:`chase 5/24`, convert:`chase 5/24`, matches: true},
    {query:`does amex allow au`, convert:`does (amex|"american express") allow (au|"authorized user")`, matches: false},
    {query:`mdd`, convert:`(mdd|"modified double dip")`, matches: true},
    {query:`(sapphire|csp)`, convert:`(sapphire|csp)`, matches: true},
    {query:`csr pc`, convert:`(csr|"sapphire reserve") (pc|"product change")`, matches: true},
    {query:`chase sapphire reserve product change`, convert:`chase ("sapphire reserve"|csr) ("product change"|pc)`, matches: true},
    {query:`MDD+success`, convert:`(mdd|"modified double dip")+success`, matches: true},
    {query:`biz plat retention`, convert:`(biz|business) (plat|platinum) retention`, matches: false},
    {query:`(ink|cip|ciu|cic) multiple`, convert:`(ink|cip|ciu|cic) multiple`, matches: false},
    {query:`Amex cc 2/90`, convert:`(amex|"american express") (cc|"credit card") 2/90`, matches: true},
    {query:`SW CP`, convert:`(sw|southwest) (cp|"companion pass")`, matches: true},
    {query:`"as cp"`, convert:`"as cp"`, matches: false},
    {query:`amex plat retention -biz`, convert:`(amex|"american express") (plat|platinum) retention -(biz|business)`, matches: false},
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