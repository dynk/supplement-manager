const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/supplements', require('./supplements'));
router.use('/vendors', require('./vendors'));

module.exports = exports = router;
