const router           = require('express').Router();
const { vehiclesHandler } = require('./handlers');

router.get('/', vehiclesHandler);

module.exports = router;
