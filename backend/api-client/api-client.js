const axios      = require('axios').default;
const { VError } = require('verror');

const {
          validateConstructorOptions,
          validateRawDataOptions,
          mapLastDataResponse,
          mapRawDataResponse,
      } = require('./helpers')

class ApiClient {
    /**
     * @param {object} options
     * @param {string} options.baseUrl
     * @param {string} options.apiToken
     */
    constructor(options) {
        validateConstructorOptions(options);

        this.httpClient = axios.create({
                                           baseURL: options.baseUrl,
                                           timeout: 6000,
                                       });
        this.apiToken   = options.apiToken;
    }

    async getLatestVehiclesData() {
        let response;
        try {
            response = await this.httpClient.get(`/Api/Vehicles/getLastData?key=${this.apiToken}&json`);
        } catch (err) {
            switch (err.response.status) {
                case 403:
                    throw new VError({ name: 'UnauthorizedException' })
                default:
                    throw new VError({ name: 'UnexpectedException' })
            }
        }

        switch (response.status) {
            case 200:
                return mapLastDataResponse(response.data);
            default:
                throw new VError({ name: 'UnexpectedException' });
        }
    }

    /**
     * @param {object} options
     * @param {string} options.objectId
     * @param {string} options.begTimestamp
     * @param {string} options.endTimestamp
     * @returns {Promise<[]>}
     */
    async getVehicleRawData(options) {
        validateRawDataOptions(options);

        const queryParams = [
            `key=${this.apiToken}`,
            `objectId=${options.objectId}`,
            `begTimestamp=${options.begTimestamp}`,
            `endTimestamp=${options.endTimestamp}`,
            'json'
        ];
        let response;
        try {
            response = await this.httpClient
                                 .get(`/Api/Vehicles/getRawData?` + queryParams.join('&'),
                                 );
        } catch (err) {
            if (err.code === 'ECONNABORTED') {
                throw new VError({ name: 'TimeoutException' })
            }
            switch (err.response.status) {
                case 403:
                    throw new VError({ name: 'UnauthorizedException' })
                default:
                    throw new VError({ name: 'UnexpectedException' })
            }
        }

        switch (response.status) {
            case 200:
                return mapRawDataResponse(response.data);
            default:
                throw new VError({ name: 'UnexpectedException' });
        }
    }
}

module.exports = {
    ApiClient,
}
