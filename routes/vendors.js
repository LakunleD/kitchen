const express = require('express');
const router = express.Router();
const VendorController = require('../controllers/vendorController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, VendorController.listVendors);
router.get('/:id', authMiddleware, VendorController.getVendor);
router.post('/', VendorController.createVendor);
router.put('/:id', VendorController.updateVendor);


module.exports = router;