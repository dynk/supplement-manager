const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/supplements');

router.get('/', ctrl.get);
router.post('/', ctrl.post);
router.put('/:id', ctrl.put);

module.exports = router;
