const assert               = require('assert');
const { calculateEndDate } = require('./helpers');

describe('calculateEndDate()', function () {
    it('should get next date of the month', function () {
        assert.strictEqual(calculateEndDate('2019-09-22'), '2019-09-23');
    });

    it('should get first date of next month', function () {
        assert.strictEqual(calculateEndDate('2019-09-30'), '2019-10-01');
    });
})