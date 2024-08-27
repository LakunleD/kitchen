const { Vendor } = require('../models');

class VendorService {
  async getAllVendors(page, limit) {
    try {
      const offset = (page - 1) * limit;
      const { count, rows } = await Vendor.findAndCountAll({ limit, offset });
      return { count, rows };
    } catch (error) {
      throw new Error(`Failed to fetch vendor: ${error.message}`);
    }
  }

  async getVendorById(id) {
    try {
      return await Vendor.findByPk(id);
    } catch (error) {
      throw new Error(`Failed to fetch vendor: ${error.message}`);
    }
  }

  async createVendor(data) {
    try {
      const { phone } = data;
      const existingVendor = await Vendor.findOne({ where: { phone } });
      if (existingVendor) {
        throw new Error('Phone already in use.');
      }
      return await Vendor.create(data);
    } catch (error) {
      throw new Error(`Failed to create vendor: ${error.message}`);
    }
    
  }

  async updateVendor(id, data) {
    try {
      await Vendor.update(data, { where: { id } });
      return await Vendor.findByPk(id);      
    } catch (error) {
      throw new Error(`Failed to update vendor: ${error.message}`);
    }
  }

  async loginVendor(data) {
    try {
      const { email, password } = data;
      const vendor = await Vendor.findOne({ where: { email } });
      if (!vendor || !(await vendor.validPassword(password))) {
        throw new Error('Invalid email or password');
      }
      const { password: _, ...vendorData  } = vendor.toJSON();
      const token = generateToken(vendor);
      return { vendor: vendorData, token };
    } catch (error) {
      throw new Error(`Failed to login vendor: ${error.message}`);
    }
  }

}

module.exports = new VendorService();