
const { MarkovMachine } = require("./markov");

beforeAll(function() {
    test = "the cat in the hat";
    longtext = `I am Sam
                Sam I am

                That Sam-I-am
                That Sam-I-am!
                I do not like
                That Sam-I-am

                Do you like
                Green eggs and ham

                I do not like them,
                Sam-I-am.
                I do not like
                Green eggs and ham.`
    mm = new MarkovMachine(test);
    mm2 = new MarkovMachine(longtext);

})
describe("initialize markov machine", function () {

    test('makes chains object', function () {

        expect(mm.chains).toBeDefined();
        expect(mm.chains).toStrictEqual({
            "the": ["cat", "hat"],
            "cat": ["in"], 
            "in": ["the"], 
            "hat": [null]
        });
    })

    test('correct chains', function() {
        expect(mm2.chains).toBeDefined();
        expect(mm2.chains['Do']).toContain('you');
        expect(mm2.chains['like']).toContain('Green');
        expect(mm2.chains['like']).toContain('them,');
        expect(mm2.chains['like']).toContain('That');
    })
})

describe("test makeText()", function() {

    test('makes text with appropiate length', function () {
        expect(mm.makeText().split(" ").length).toBe(100);
    })
})