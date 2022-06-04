const express = require('express');
const { body, validationResult } = require('express-validator');
const database = require('./../database');

const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.post('/adddata', body('temperature_water').isNumeric(), body('temperature_air').isNumeric(), body('humidity').isNumeric(), body('co2_level').isNumeric(), body('ph_value').isNumeric(), body('ec_value').isNumeric(), body('swimmer_1').isNumeric(), body('swimmer_2').isNumeric(), body('swimmer_3').isNumeric(), (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const timestamp = new Date().getTime();

    database.sql.connect(database.sqlConfig).then((pool) => {
        pool.query('INSERT INTO [HydroPoc].[dbo].[sensordata] (temperature_water, temperature_air, humidity, co2_level, ph_value, ec_value, swimmer_1, swimmer_2, swimmer_3, timestamp) VALUES (' + req.body['temperature_water'] + ', ' + req.body['temperature_air'] + ', ' + req.body['humidity'] + ', ' + req.body['co2_level'] + ', ' + req.body['ph_value'] + ', ' + req.body['ec_value'] + ', ' + req.body['swimmer_1'] + ', ' + req.body['swimmer_2'] + ', ' + req.body['swimmer_3'] + ',' + timestamp + ')')
            .then((result) => {
                return res.status(201).json({ success: true, timestamp });
            })
            .catch((insertError) => {
                console.error(insertError);
                return res.status(400).json({ error: 'data_error_adding' });
            });
    });
});

router.get('/data', body('amount').isInt({ min: 1, max: 100 }), (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    database.sql.connect(database.sqlConfig).then((pool) => {
        pool.query('SELECT TOP ' + req.body['amount'] + ' * FROM [HydroPoc].[dbo].[sensordata] ORDER BY id DESC')
            .then((result) => {
                const data = [];

                result.recordset.forEach((sensorData) => {
                    sensorData['timestamp'] = parseInt(sensorData['timestamp']);
                    data.push(sensorData);
                });

                return res.status(200).json(data);
            })
            .catch((selectError) => {
                console.error(selectError);
                return res.status(400).json({ error: 'data_error_reading_sensor' });
            });
    });
});

module.exports = router;
