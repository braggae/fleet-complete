const assert               = require('assert');
const {
          mapLastDataResponse,
          mapRawDataResponse,
      }                    = require('./helpers')
const mockLastDataResponse = Object.freeze(require('./mocks/mock-response.json'));
const mockRawDataResponse = Object.freeze(require('./mocks/mock-raw-data-response.json'));
const mockRawDataResponseWithDelta = Object.freeze(require('./mocks/mock-raw-data-response-with-delta.json'));

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
            speed: null,
        })
    });
});

describe('mapRawDataResponse()', function () {
    it('should map response', function () {
        const mapped = mapRawDataResponse(mockRawDataResponse);

        assert.strictEqual(mapped.length, 4);

        assert.deepStrictEqual(mapped[3], {
            timestamp: "2019-09-30 03:29:17+0300",
            latitude: 58.35176,
            longitude: 26.738573,
            distance: 119014.623,
            direction: 272.8,
        });
    });

    it('should map response with DeltaDistance', function () {
        const mapped = mapRawDataResponse(mockRawDataResponseWithDelta);

        assert.strictEqual(mapped.length, 31);

        assert.deepStrictEqual(mapped[30], {
            timestamp: "2021-07-29 07:28:50+0300",
            latitude: 58.34303,
            longitude: 26.739778,
            distance: 1.1379999999999997,
            direction: 272.8,
        });
    });
})