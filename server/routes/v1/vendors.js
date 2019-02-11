const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/vendors');
const { isAdmin} = require('../../middlewares/authenticate');

router.get('/', ctrl.get);
router.post('/', isAdmin, ctrl.post);

module.exports = router;
