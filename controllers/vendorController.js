const VendorService = require('../services/vendorService');

class VendorController {
  async listVendors(req, res) {
    
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const result = await VendorService.getAllVendors(page, limit);
      return res.status(200).json({
        totalItems: result.count,
        totalPages: Math.ceil(result.count / limit),
        currentPage: page,
        vendors: result.rows,
      });
    } catch (error) {
      return res.status(404).json({ error: 'Error while fetching vendors' });
    }
  }

  async getVendor(req, res) {
    try {
      const vendor = await VendorService.getVendorById(req.params.id);
      return res.status(200).json(vendor);
    } catch (error) {
      return res.status(404).json({ error: 'Error while fetching vendor details' });
    }
  }

  async createVendor(req, res) {
    try {
      const newVendor = await VendorService.createVendor(req.body);
      return res.status(201).json(newVendor);
    } catch (error) {
      return res.status(400).json({ error: 'Error signing up vendor' });
    }
  }

  async updateVendor(req, res) {
    try {
      const updatedVendor = await VendorService.updateVendor(req.params.id, req.body);
      return res.status(200).json(updatedVendor);
    } catch (error) {
      return res.status(404).json({ error: 'Error while updating vendor' });
    }
  }

  async deleteVendor(req, res) {
    try {
      const result = await VendorService.deleteVendor(req.params.id);
      return res.status(204).json(result);
    } catch (error) {
      return res.status(404).json({ error: 'Error while deleting vendor' });
    }
    
  }
}

module.exports = new VendorController();