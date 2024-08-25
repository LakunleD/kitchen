const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(customer) {
    return jwt.sign({ id: customer.id, email: customer.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

module.exports = { generateToken, verifyToken };