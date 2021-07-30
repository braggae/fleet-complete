const { VError } = require('verror');

function validateConstructorOptions(options) {
    if (!options?.baseUrl) {
        throw new VError({ name: 'InvalidArgumentException' }, 'Missing required property `baseUrl`');
    }

    if (!options?.apiToken) {
        throw new VError({ name: 'InvalidArgumentException' }, 'Missing required property `apiToken`');
    }
}

function validateRawDataOptions(options) {
    if (!options?.objectId) {
        throw new VError({ name: 'InvalidArgumentException' }, 'Missing required property `objectId`');
    }

    if (!options?.begTimestamp) {
        throw new VError({ name: 'InvalidArgumentException' }, 'Missing required property `begTimestamp`');
    }

    if (!options?.endTimestamp) {
        throw new VError({ name: 'InvalidArgumentException' }, 'Missing required property `endTimestamp`');
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
        speed: data.speed,
    };
}

function mapLastDataResponse(data) {
    const mapped = [];
    for (let o of data.response) {
        mapped.push(mapLastDataItem(o));
    }
    return mapped;
}

function mapRowDataItem(data) {
    return {
        timestamp: data.timestamp,
        latitude: data.Latitude,
        longitude: data.Longitude,
        distance: data.Distance,
        direction: data.Direction,
    };
}

function mapRawDataResponse(data) {
    const mapped = [];
    for (let o of data.response) {
        mapped.push(mapRowDataItem(o));
    }
    return mapped;
}

module.exports = {
    validateConstructorOptions,
    validateRawDataOptions,
    mapLastDataResponse,
    mapRawDataResponse,
}
