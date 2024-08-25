require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./models').sequelize;

const vendorsRoutes = require('./routes/vendors');
const menuItemsRoutes = require('./routes/menuItems');
const customersRoutes = require('./routes/customers');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/vendors', vendorsRoutes);
app.use('/menu-items', menuItemsRoutes);
app.use('/customers', customersRoutes);

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
});