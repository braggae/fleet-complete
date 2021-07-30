const assert        = require('assert');
const sinon         = require('sinon');
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
            ));
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

    describe('#getVehicleRawData', function () {
        it('should throw on missing `objectId` option', async function () {
            const apiClient = new ApiClient({ baseUrl: 'https://base.url/app', apiToken: 'token' });

            try {
                await apiClient.getVehicleRawData({})
            } catch (err) {
                assert.equal(err.name, 'InvalidArgumentException');
                assert.equal(err.message, 'Missing required property `objectId`');
                return;
            }
            assert.fail('Should throw');
        });

        it('should throw on missing `begTimestamp` option', async function () {
            const apiClient = new ApiClient({ baseUrl: 'https://base.url/app', apiToken: 'token' });

            try {
                await apiClient.getVehicleRawData({
                                                      objectId: 123,
                                                  })
            } catch (err) {
                assert.equal(err.name, 'InvalidArgumentException');
                assert.equal(err.message, 'Missing required property `begTimestamp`');
                return;
            }
            assert.fail('Should throw');
        });

        it('should throw on missing `endTimestamp` option', async function () {
            const apiClient = new ApiClient({ baseUrl: 'https://base.url/app', apiToken: 'token' });

            try {
                await apiClient.getVehicleRawData({
                                                      objectId: 123,
                                                      begTimestamp: '2019-10-01',
                                                  })
            } catch (err) {
                assert.equal(err.name, 'InvalidArgumentException');
                assert.equal(err.message, 'Missing required property `endTimestamp`');
                return;
            }
            assert.fail('Should throw');
        });

        it('should build correct request', async function () {
            const fakeHttpGet    = sinon.fake.returns({ status: 200, data: { 'response': [{}] } });
            const apiClient      = new ApiClient({ baseUrl: 'https://base.url/app', apiToken: 'token' });
            apiClient.httpClient = {
                get: fakeHttpGet,
            }

            await apiClient.getVehicleRawData({
                                                  objectId: 123,
                                                  begTimestamp: '2019-09-30',
                                                  endTimestamp: '2019-10-01',
                                              });

            assert(fakeHttpGet.called);
            assert(fakeHttpGet.calledWith(
                '/Api/Vehicles/getRawData?key=token&objectId=123&begTimestamp=2019-09-30&endTimestamp=2019-10-01&json',
            ))
        });
    })
});
