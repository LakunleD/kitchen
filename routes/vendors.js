const express = require('express');
const router = express.Router();
const VendorController = require('../controllers/vendorController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, VendorController.listVendors);
router.get('/:id', authMiddleware, VendorController.getVendor);
router.post('/', authMiddleware, VendorController.createVendor);
router.put('/:id', authMiddleware, VendorController.updateVendor);
router.post('/login', VendorController.login);


module.exports = router;