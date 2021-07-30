const router           = require('express').Router();
const { vehiclesRouteDataHandler } = require('./handlers');

router.get('/', vehiclesRouteDataHandler);

module.exports = router;
