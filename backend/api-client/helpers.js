const { VError } = require('verror');

const CAR_STOP_DURATION_THRESHOLD = 60000; //One minute

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

function mapLastDataResponse(data) {
    const mapped = [];
    for (let item of data.response) {
        mapped.push(mapLastDataItem(item));
    }
    return mapped;

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
}

function mapRawDataResponse(data) {
    const mapped           = [];
    let calculatedDistance = 0;
    let stoppedSince = undefined;

    for (let index = 0, responseLength = data.response.length; index < responseLength; index++) {
        const item = data.response[index];
        const prevItem = data.response[index - 1];

        calculatedDistance += item.DeltaDistance ?? 0;

        if (isSameLocation(item, prevItem) && !stoppedSince) {
            stoppedSince = prevItem?.timestamp;
        } else if (stoppedSince) {
            mapped[mapped.length - 1].isStop = isStop(item, stoppedSince);
            stoppedSince = undefined;
        }

        mapped.push({
                        timestamp: item.timestamp,
                        latitude: item.Latitude,
                        longitude: item.Longitude,
                        distance: item.Distance ?? calculatedDistance,
                        isStop: index === 0 || index === responseLength - 1,//First and last points are considered as stops
                    });
    }

    return mapped;

    function isSameLocation(currentItem, prevItem = {}) {
        return currentItem.Latitude === prevItem.Latitude && currentItem.Longitude === prevItem.Longitude;
    }

    function isStop(item, stoppedSince) {
        return (new Date(item.timestamp) - new Date(stoppedSince)) > CAR_STOP_DURATION_THRESHOLD;
    }
}

module.exports = {
    validateConstructorOptions,
    validateRawDataOptions,
    mapLastDataResponse,
    mapRawDataResponse,
}
