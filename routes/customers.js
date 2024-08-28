const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customerController');

router.post('/', CustomerController.signup);
router.post('/login', CustomerController.login);

module.exports = router;