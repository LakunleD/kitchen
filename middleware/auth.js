const jwt = require('jsonwebtoken');
const { Customer, Vendor } = require('../models');
const { verifyToken } = require('./jwt');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = verifyToken(token);

        const {type, id} = decoded
        if(type == 'Customer'){
            const customer = await Customer.findByPk(id);

            if (!customer) {
                return res.status(401).json({ error: 'Invalid token' });
            }
    
            req.customer = customer;
            next();
        }
        else{
            const vendor = await Vendor.findByPk(id);

            if (!vendor) {
                return res.status(401).json({ error: 'Invalid token' });
            }
    
            req.vendor = vendor;
            next();
        }
        
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;