const assert                  = require('assert');
const { mapLastDataResponse } = require('./helpers')
const mockLastDataResponse    = Object.freeze(require('./mock-response.json'));

describe('mapLastDataResponse()', function () {
    it('should map response', function () {
        const mapped = mapLastDataResponse(mockLastDataResponse);

        assert.strictEqual(mapped.length, 2);
        assert.deepStrictEqual(mapped[0], {
            objectId: 187370,
            address: "Suur-Sõjamäe 33c, Tallinn, Harjumaa, EE",
            latitude: 59.41641,
            longitude: 24.861235,
            timestamp: '2020-07-08 15:37:49+0300',
            name: '2222LN',
        })
    });
})