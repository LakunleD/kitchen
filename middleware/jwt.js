const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(data, type) {
  const { id, email } = data;
  return jwt.sign({ id, email, type }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

module.exports = { generateToken, verifyToken };