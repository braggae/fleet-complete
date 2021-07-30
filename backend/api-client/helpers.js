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
    for (let item of data.response) {
        mapped.push(mapLastDataItem(item));
    }
    return mapped;
}

function mapRawDataResponse(data) {
    const mapped = [];
    let calculatedDistance = 0;
    for (let item of data.response) {
        if (item.DeltaDistance) {
            calculatedDistance += item.DeltaDistance;
        }

        mapped.push({
                        timestamp: item.timestamp,
                        latitude: item.Latitude,
                        longitude: item.Longitude,
                        distance: item.Distance ?? calculatedDistance,
                        direction: parseFloat(item.Direction),
                    });
    }
    return mapped;
}

module.exports = {
    validateConstructorOptions,
    validateRawDataOptions,
    mapLastDataResponse,
    mapRawDataResponse,
}
