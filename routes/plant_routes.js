const express = require('express');
const { body, validationResult } = require('express-validator');
const database = require('./../database');

const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.post('/pictures', body('startTime').isNumeric(), body('endTime').isNumeric(), (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    database.sql.connect(database.sqlConfig).then((pool) => {
        pool.query('SELECT * FROM [HydroPoc].[dbo].[images] WHERE timestamp >= ' + req.body['startTime'] + ' AND timestamp <= ' + req.body['endTime'] + ' ORDER BY id DESC')
            .then((result) => {
                return res.status(200).json(result.recordset);
            })
            .catch((selectError) => {
                return res.status(400).json({ error: 'data_error_reading_images' });
            });
    });
});

module.exports = router;
