const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/supplements', require('./supplements'));

module.exports = exports = router;
