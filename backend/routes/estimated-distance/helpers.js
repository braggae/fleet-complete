
function formatPoint(point) {
    return `${point.lat},${point.lng}`;
}

function buildDestinationsList(...points) {
    const destinations = [];

    points.forEach(stop => destinations.push(formatPoint(stop)));
    return destinations;
}

function extractDistanceValue(distanceMatrix) {
    return distanceMatrix.data.rows[0].elements[0].distance.value;
}

module.exports = {
    extractDistanceValue,
    buildDestinationsList,
};
