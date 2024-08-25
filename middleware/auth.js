const jwt = require('jsonwebtoken');
const { Customer } = require('../models');
const { verifyToken } = require('./jwt');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        //jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        
        const customer = await Customer.findByPk(decoded.id);

        if (!customer) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.customer = customer;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;