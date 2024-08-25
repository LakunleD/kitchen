const CustomerService = require('../services/customerService');

class CustomerController {
  async signup(req, res) {
    try {
      const newCustomer = await CustomerService.createCustomer(req.body);
      return res.status(201).json(newCustomer);
    } catch (error) {
      return res.status(400).json({ error: 'Error signing up customer' });
    }
  }

  async login(req, res) {

    try {
      const { customer, token } = await CustomerService.loginCustomer(req.body);
      return res.status(200).json({ customer, token });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new CustomerController();