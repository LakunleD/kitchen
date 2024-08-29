const { MenuItem } = require('../models');

class MenuItemService {
  async getMenuItemsByVendor(vendorId) {
    try {
      return await MenuItem.findAll({ where: { vendor_id: vendorId } }); 
    } catch (error) {
      throw new Error(`Failed to get Vendor menu items: ${error.message}`);
    }
  }

  async getMenuItemById(id) {
    try {
      return await MenuItem.findByPk(id);
    } catch (error) {
      throw new Error(`Failed to get Vendor menu item: ${error.message}`);
    }
  }

  async createMenuItem(data, ) {
    try {
      return await MenuItem.create(data);
    } catch (error) {
      throw new Error(`Failed to create Vendor menu item: ${error.message}`);
    }
  }

  async updateMenuItem(id, data) {
    try {
      await MenuItem.update(data, { where: { id } });
      return await MenuItem.findByPk(id);
    } catch (error) {
      throw new Error(`Failed to update Vendor menu item: ${error.message}`);
    }
  }

  async deleteMenuItem(id) {
    try {
      await MenuItem.destroy({ where: { id } });
      return { message: 'Menu item deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete Vendor menu item: ${error.message}`);
    }
  }

  async getAllMenuItems() {
    try {
      return await MenuItem.findAll(); 
    } catch (error) {
      throw new Error(`Failed to get all menu items: ${error.message}`);
    }
  }
}

module.exports = new MenuItemService();