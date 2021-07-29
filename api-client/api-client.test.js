const assert        = require('assert');
const sinon         = require('sinon');
const { Forbidden } = require('http-errors');
const { ApiClient } = require('./api-client');

describe('ApiClient', function () {
    it('should throw on missing base url option', function () {
        try {
            new ApiClient({});
        } catch (err) {
            assert.equal(err.name, 'InvalidArgumentException');
            assert.equal(err.message, 'Missing required property `baseUrl`');
            return;
        }
        assert.fail('Should throw');
    });

    it('should throw on missing api token option', function () {
        try {
            new ApiClient({ baseUrl: 'url' });
        } catch (err) {
            assert.equal(err.name, 'InvalidArgumentException');
            assert.equal(err.message, 'Missing required property `apiToken`');
            return;
        }
        assert.fail('Should throw');
    });

    describe('#getLatestVehiclesData', function () {
        it('should make request to correct endpoint', async function () {
            const fakeHttpGet    = sinon.fake.returns({ status: 200, data: { 'response': [{}] } });
            const apiClient      = new ApiClient({ baseUrl: 'https://base.url/app', apiToken: 'token' });
            apiClient.httpClient = {
                get: fakeHttpGet,
            }

            await apiClient.getLatestVehiclesData();

            assert(fakeHttpGet.called);
            assert(fakeHttpGet.calledWith(
                '/Api/Vehicles/getLastData?key=token&json',
            ))
        });

        it('should throw unexpected exception', async function () {
            const fakeHttpGet    = sinon.fake.returns({ status: 418, data: { 'response': null } });
            const apiClient      = new ApiClient({ baseUrl: 'https://base.url/app', apiToken: 'token' });
            apiClient.httpClient = {
                get: fakeHttpGet,
            }

            try {
                await apiClient.getLatestVehiclesData();
            } catch (err) {
                assert.equal(err.name, 'UnexpectedException');
                return;
            }
            assert.fail('Should throw');
        });
    });
});
