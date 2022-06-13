const express = require('express');
const { body, validationResult } = require('express-validator');
const database = require('./../database');
const config = require('./../config');

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
                return res.status(400).json({ error: 'data_error_adding' });
            });
    });
});

router.post('/data', body('amount').optional().isInt({ min: 1, max: 1000 }), (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const data = {
        averages: {
            temperature_water: 0,
            temperature_air: 0,
            humidity: 0,
            co2_level: 0,
            ph_value: 0,
            ec_value: 0,
            swimmer_1: 0,
            swimmer_2: 0,
            swimmer_3: 0,
        },
        sensors: [],
        pumpactivity: [],
        limits: config.limits,
    };

    const amount = req.body['amount'] == undefined ? 1000 : req.body['amount'];

    database.sql.connect(database.sqlConfig).then((pool) => {
        pool.query('SELECT TOP ' + amount + ' * FROM [HydroPoc].[dbo].[sensordata] ORDER BY id ASC')
            .then((result) => {
                result.recordset.forEach((sensorData) => {
                    data.averages.temperature_water += sensorData['temperature_water'];
                    data.averages.temperature_air += sensorData['temperature_air'];
                    data.averages.humidity += sensorData['humidity'];
                    data.averages.co2_level += sensorData['co2_level'];
                    data.averages.ph_value += sensorData['ph_value'];
                    data.averages.ec_value += sensorData['ec_value'];
                    data.averages.swimmer_1 += sensorData['swimmer_1'];
                    data.averages.swimmer_2 += sensorData['swimmer_2'];
                    data.averages.swimmer_3 += sensorData['swimmer_3'];

                    sensorData['timestamp'] = parseInt(sensorData['timestamp']);
                    data.sensors.push(sensorData);
                });

                data.averages.temperature_water /= result.recordset.length;
                data.averages.temperature_air /= result.recordset.length;
                data.averages.humidity /= result.recordset.length;
                data.averages.co2_level /= result.recordset.length;
                data.averages.ph_value /= result.recordset.length;
                data.averages.ec_value /= result.recordset.length;
                data.averages.swimmer_1 /= result.recordset.length;
                data.averages.swimmer_2 /= result.recordset.length;
                data.averages.swimmer_3 /= result.recordset.length;

                pool.query('SELECT TOP ' + amount + ' * FROM [HydroPoc].[dbo].[pumpactivity] ORDER BY id ASC')
                    .then((result) => {
                        result.recordset.forEach((pumpData) => {
                            pumpData['timestamp'] = parseInt(pumpData['timestamp']);
                            data.pumpactivity.push(pumpData);
                        });

                        return res.status(200).json(data);
                    })
                    .catch((selectError) => {
                        return res.status(400).json({ error: 'data_error_reading_activity' });
                    });
            })
            .catch((selectError) => {
                return res.status(400).json({ error: 'data_error_reading_sensor' });
            });
    });
});

router.post('/data_sensor', body('sensor').isString(), body('time').isInt({ min: 1, max: 86400 }), (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const data = {
        average: 0,
        sensors: [],
        minMax: {
            minimum: { value: 0, timestamp: 0 },
            maximum: { value: 0, timestamp: 0 },
        },
        limits: config.limits[req.body['sensor']],
    };

    database.sql.connect(database.sqlConfig).then((pool) => {
        pool.query('SELECT ' + req.body['sensor'] + ', timestamp FROM [HydroPoc].[dbo].[sensordata] WHERE timestamp > ' + (new Date().getTime() - req.body['time'] * 1000) + ' ORDER BY id ASC')
            .then((result) => {
                result.recordset.forEach((sensorData) => {
                    sensorData['timestamp'] = parseInt(sensorData['timestamp']);
                    data.average += sensorData[req.body['sensor']];
                    data.sensors.push(sensorData);
                });

                const values = data.sensors.map((object) => object[req.body['sensor']]);

                data.average /= result.recordset.length;
                data.minMax.minimum.value = Math.min(...values);
                data.minMax.maximum.value = Math.max(...values);
                data.minMax.minimum.timestamp = data.sensors.find((object) => object[req.body['sensor']] == Math.min(...values)).timestamp;
                data.minMax.maximum.timestamp = data.sensors.find((object) => object[req.body['sensor']] == Math.max(...values)).timestamp;

                return res.status(200).json(data);
            })
            .catch((selectError) => {
                return res.status(400).json({ error: 'data_error_reading_sensor_timestamp' });
            });
    });
});

module.exports = router;
