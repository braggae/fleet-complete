const distance = require('google-distance-matrix');
const DistanceMatrix = require('node-distance-matrix');
distance.key(process.env.MAPS_API_KEY);
const { buildDestinationsList, extractDistanceValue } = require('./helpers');

async function calculateEstimatedDistance(req, res) {
    const destinations = buildDestinationsList(req.body.routeOrigin, ...req.body.listOfStops);
    let totalDistance = 0;
    for (let i = 0; i < destinations.length - 1; i++) {
        const distanceMatrix = await DistanceMatrix.getDistanceMatrix(
            process.env.MAPS_API_KEY,
            destinations[i],
            destinations[i + 1],
            'driving',
            'metric'
        );
        totalDistance += extractDistanceValue(distanceMatrix);
    }
    res.json({ totalDistance });
}

module.exports = {
    calculateEstimatedDistance,
}
