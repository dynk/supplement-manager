const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/users');

router.get('/credentials', ctrl.getCredentials);
router.get('/', ctrl.get);
router.post('/', ctrl.post);
router.post('/login', ctrl.login);

module.exports = router;
