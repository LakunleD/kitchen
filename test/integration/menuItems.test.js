const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const { MenuItem, Vendor } = require('../../models');

chai.use(chaiHttp);
const { expect } = chai;

describe('MenuItem Integration Tests', () => {
  let vendorId;

  before(async () => {
    await Vendor.sync({ force: true });
    await MenuItem.sync({ force: true });

    vendor = await Vendor.create({
      name: 'Amala house',
      address: '123 Tobun Street',
      phone: '080-2339-1224',
      email: 'amala@restaurant.com',
      password: 'password12',
    });

    vendorId = vendor.id;

    await MenuItem.create({
      name: 'Amala',
      vendor_id: vendorId,
      description: 'hot blazing amala',
      price: 1800.00,
    });
  });

  describe('POST /menu-items', () => {
    it('should create a new menu item', async () => {
      const data = { name: 'Truffle Pasta', vendor_id: vendorId, description: 'Delicious pasta with truffles', price: 18.5 };
      const res = await chai.request(app).post('/menu-items').send(data);

      expect(res).to.have.status(201);
      expect(res.body).to.include({ name: 'Truffle Pasta', vendor_id: vendorId });
    });
  });

  describe('GET /menu-items/vendor/:vendorId', () => {
    it('should retrieve menu items by vendor', async () => {
      const res = await chai.request(app).get(`/menu-items/vendor/${vendorId}`).set('Authorization', 'Bearer your_jwt_token');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.include({ name: 'Truffle Pasta' });
    });
  });

  describe('DELETE /menu-items/:id', () => {
    it('should delete a menu item', async () => {
      const menuItem = await MenuItem.create({ name: 'Caesar Salad', vendor_id: vendorId, description: 'Fresh salad', price: 10.0 });
      const res = await chai.request(app).delete(`/menu-items/${menuItem.id}`).set('Authorization', 'Bearer your_jwt_token');

      expect(res).to.have.status(204);
    });
  });

  describe('GET /menu-items', () => {
    it('should list all menu items', async () => {
      const res = await chai.request(app).get('/menu-items').set('Authorization', 'Bearer your_jwt_token');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.include({ name: 'Amala' });
    });

    it('should filter menu items by vendor when vendorId is provided', async () => {
      const res = await chai.request(app).get(`/menu-items?vendorId=${vendor.id}`).set('Authorization', 'Bearer your_jwt_token');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.include({ name: 'Amala', vendor_id: vendor.id });
    });
  });
});