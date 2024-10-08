const express = require('express');
const router = express.Router();
const MenuItemController = require('../controllers/menuItemController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, MenuItemController.listMenuItemsByVendor);
router.get('/:id', authMiddleware, MenuItemController.getMenuItem);
router.post('/', authMiddleware, MenuItemController.createMenuItem);
router.put('/:id', authMiddleware, MenuItemController.updateMenuItem);
router.delete('/:id', authMiddleware, MenuItemController.deleteMenuItem);

module.exports = router;