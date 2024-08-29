const MenuItemService = require('../services/menuItemService');

class MenuItemController {
  async listMenuItemsByVendor(req, res) {
    try {
      const vendor_id = (req.vendor)? req.vendor.id: null;
      
      let menuItems;
      
      if (vendor_id) {
        menuItems = await MenuItemService.getMenuItemsByVendor(vendor_id);
      } else {

        menuItems = await MenuItemService.getAllMenuItems();
      }
      return res.status(200).json(menuItems);
    } catch (error) {
      return res.status(400).json({ error: 'Error ' });
    }
  }

  async getMenuItem(req, res) {
    try {
      const menuItem = await MenuItemService.getMenuItemById(req.params.id);
      return res.status(200).json(menuItem);
    } catch (error) {
      return res.status(400).json({ error: 'Error ' });
    }
  }

  async createMenuItem(req, res) {
    try {
      const vendor_id = req.vendor.id;
      const { name, description, price } = req.body;
      const data = {
        name,
        description,
        price,
        vendor_id
      }
      const newMenuItem = await MenuItemService.createMenuItem(data);
      return res.status(201).json(newMenuItem);
    } catch (error) {
      return res.status(400).json({ error: 'Error ' });
    }
  }

  async updateMenuItem(req, res) {
    try {
      const updatedMenuItem = await MenuItemService.updateMenuItem(req.params.id, req.body);
      return res.status(200).json(updatedMenuItem);
    } catch (error) {
      return res.status(400).json({ error: 'Error ' });
    }
  }

  async deleteMenuItem(req, res) {
    try {
      const result = await MenuItemService.deleteMenuItem(req.params.id);
      return res.status(204).json(result);
    } catch (error) {
      return res.status(400).json({ error: 'Error ' });
    }
  }
}

module.exports = new MenuItemController();