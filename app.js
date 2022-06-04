const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const userRoutes = require('./routes/user_routes');
const sensorRoutes = require('./routes/sensor_routes');
const deviceRoutes = require('./routes/device_routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: '*', allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'], allowHeaders: ['Content-Type', 'Accept'] }));
app.use((error, req, res, next) => {
    if (error instanceof SyntaxError) {
        res.status(400).send({ error: 'Bad request' });
    } else next();
});

app.use('/api/user', userRoutes);
app.use('/api/sensor', sensorRoutes);
app.use('/api/device', deviceRoutes);

module.exports = app;
