const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customerController');

router.post('/signup', CustomerController.signup);
router.post('/login', CustomerController.login);

module.exports = router;