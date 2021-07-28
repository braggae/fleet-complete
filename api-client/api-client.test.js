const assert = require('assert');
const { ApiClient } = require('./api-client');

describe('ApiClient', function () {
    it('should throw on missing base url option', function () {
        try {
            new ApiClient({});
        } catch (err) {
            assert.equal(err.name, 'InvalidArgumentException');
            return;
        }
        assert.fail('Should throw');
    });
});
