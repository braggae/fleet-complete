const router                         = require('express').Router();
const { calculateEstimatedDistance } = require('./handlers');

router.post('/', calculateEstimatedDistance);

module.exports = router;
