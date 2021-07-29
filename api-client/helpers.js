const { VError } = require('verror');

function validateOptions(options) {
    if (!options.baseUrl) {
        throw new VError({ name: 'InvalidArgumentException' }, 'Missing required property `baseUrl`');
    }

    if (!options.apiToken) {
        throw new VError({ name: 'InvalidArgumentException' }, 'Missing required property `apiToken`');
    }
}

function mapLastDataItem(data) {
    return {
        objectId: data.objectId,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        timestamp: data.timestamp,
        name: data.objectName,
    };
}

function mapLastDataResponse(data) {
    const mapped = [];
    for (let o of data.response) {
        mapped.push(mapLastDataItem(o));
    }
    return mapped;
}

module.exports = {
    validateOptions,
    mapLastDataResponse,
}
