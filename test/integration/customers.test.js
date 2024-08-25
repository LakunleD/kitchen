const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const { Customer } = require('../../models');

chai.use(chaiHttp);
const { expect } = chai;

describe('Customer Integration Tests', () => {
  before(async () => {
    await Customer.sync({ force: true }); // Ensure the database is clean before tests
  });

  describe('POST /customers/signup', () => {
    it('should sign up a new customer', async () => {
      const data = { name: 'Olakunle Dosunmu', email: 'olakunle@dosunmu.com', password: 'password123' };
      const res = await chai.request(app).post('/customers/signup').send(data);

      expect(res).to.have.status(201);
      expect(res.body.customer).to.include({ name: 'Jane Doe', email: 'olakunle@dosunmu.com' });
    });

    it('should return an error if email already exists', async () => {
      const data = { name: 'Olakunle Dosunmu', email: 'olakunle@dosunmu.com', password: 'password123' };
      const res = await chai.request(app).post('/customers/signup').send(data);

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error', 'Error signing up customer');
    });
  });

  describe('POST /customers/login', () => {
    it('should log in a customer and return a token', async () => {
      const data = { email: 'olakunle@dosunmu.com', password: 'password123' };
      const res = await chai.request(app).post('/customers/login').send(data);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('token');
      expect(res.body.customer).to.include({ email: 'olakunle@dosunmu.com' });
    });

    it('should return an error if the credentials are incorrect', async () => {
      const data = { email: 'olakunle@dosunmu.com', password: 'wrongpassword' };
      const res = await chai.request(app).post('/customers/login').send(data);

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error', 'Invalid email or password');
    });
  });
});