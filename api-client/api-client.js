const axios      = require('axios').default;
const { VError } = require('verror');

const { validateOptions, mapLastDataResponse } = require('./helpers')

class ApiClient {
    /**
     * @param {object} options
     * @param {string} options.baseUrl
     * @param {string} options.apiToken
     */
    constructor(options) {
        validateOptions(options);

        this.httpClient = axios.create({
                                           baseURL: options.baseUrl,
                                           timeout: 2000,
                                       });
        this.apiToken = options.apiToken;
    }

    async getLatestVehiclesData() {
        let response;
        try {
            response = await this.httpClient.get(`/Api/Vehicles/getLastData?key=${this.apiToken}&json`);
        } catch (err) {
            switch (err.response.status) {
                case 403:
                    throw new VError({name: 'UnauthorizedException'})
                default:
                    throw new VError({name: 'UnexpectedException'})
            }
        }

        switch (response.status) {
            case 200:
                return mapLastDataResponse(response.data);
            default:
                throw new VError({name: 'UnexpectedException'});
        }
    }
}

module.exports = {
    ApiClient,
}