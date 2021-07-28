const axios  = require('axios').default;
const { VError } = require('verror');

class ApiClient {
    /**
     * @param {object} options
     * @param {string} options.baseUrl
     */
    constructor(options) {
        if (!options.baseUrl) {
            throw new VError({name: 'InvalidArgumentException'});
        }
        this.baseUrl = options.baseUrl;
    }
}

module.exports = {
    ApiClient,
}