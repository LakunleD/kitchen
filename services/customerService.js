const { Customer } = require('../models');
const { generateToken } = require('../middleware/jwt');

class CustomerService {
  async createCustomer(data) {
    try {
      const { name, email, password } = data;
      
      const existingCustomer = await Customer.findOne({ where: { email } });
      if (existingCustomer) {
        throw new Error('Email already in use.');
      }
  
      const customer = await Customer.create({ name, email, password });
      const { password: _, ...customerData  } = customer.toJSON();
      
      return { customer: customerData };
    } catch (error) {
      throw new Error(`Failed to create customer: ${error.message}`);
    }
  }

  async findCustomerByEmail(email) {
    return await Customer.findOne({ where: { email } });
  }

  async loginCustomer(data) {
    try {
      const { email, password } = data;
      const customer = await Customer.findOne({ where: { email } });
      if (!customer || !(await customer.validPassword(password))) {
        throw new Error('Invalid email or password');
      }
      const { password: _, ...customerData  } = customer.toJSON();
      return { customer: customerData, token: generateToken(customer, 'customer')};
      
    } catch (error) {
      throw new Error(`Failed to create customer: ${error.message}`);
    }
  }
}

module.exports = new CustomerService();