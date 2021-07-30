const router           = require('express').Router();
const { indexHandler } = require('./handlers');

router.get('/', indexHandler);

module.exports = router;
