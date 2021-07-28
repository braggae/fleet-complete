const router           = require('express').Router();
const { indexHandler } = require('./handlers');

/* GET home page. */
router.get('/', indexHandler);

module.exports = router;
