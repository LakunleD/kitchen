const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const { Vendor } = require('../../models');

chai.use(chaiHttp);
const { expect } = chai;

describe('Vendor Integration Tests', () => {
  before(async () => {
    await Vendor.sync({ force: true }); // Ensure the database is clean before tests
  });

  describe('POST /vendors', () => {
    it('should create a new vendor', async () => {
      const data = { name: 'Gourmet Delight', address: '123 Food Street', phone: '555-1234' };
      const res = await chai.request(app).post('/vendors').send(data);

      expect(res).to.have.status(201);
      expect(res.body).to.include({ name: 'Gourmet Delight', phone: '555-1234' });
    });

    it('should return an error if the phone number is already in use', async () => {
      const data = { name: 'Gourmet Delight', address: '123 Food Street', phone: '555-1234' };
      const res = await chai.request(app).post('/vendors').send(data);

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error', 'Error signing up vendor');
    });
  });

  describe('GET /vendors', () => {
    it('should list all vendors', async () => {
      const res = await chai.request(app).get('/vendors').set('Authorization', 'Bearer your_jwt_token');

      expect(res).to.have.status(200);
      expect(res.body.vendors).to.be.an('array');
      expect(res.body.vendors[0]).to.include({ name: 'Gourmet Delight' });
    });
  });
});