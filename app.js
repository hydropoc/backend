const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const userRoutes = require('./routes/user_routes');
const adminRoutes = require('./routes/admin_routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: '*', allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'], allowHeaders: ['Content-Type', 'Accept'] }));

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;
