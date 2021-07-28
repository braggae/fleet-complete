const router           = require('express').Router();
const { vehiclesHandler } = require('./handlers');

/* GET home page. */
router.get('/', vehiclesHandler);

module.exports = router;
