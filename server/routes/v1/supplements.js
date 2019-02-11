const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/supplements');
const { isAdmin} = require('../../middlewares/authenticate');

router.get('/', ctrl.get);
router.post('/', isAdmin, ctrl.post);
router.put('/:id', isAdmin, ctrl.put);
router.delete('/:id', isAdmin, ctrl.destroy);

module.exports = router;
