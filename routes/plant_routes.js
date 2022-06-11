const express = require('express');
const { body, validationResult } = require('express-validator');
const database = require('./../database');

const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/pictures', body('amount').isInt({ min: 1, max: 20 }), (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    database.sql.connect(database.sqlConfig).then((pool) => {
        pool.query('SELECT TOP ' + req.body['amount'] + ' * FROM [HydroPoc].[dbo].[images] ORDER BY id DESC')
            .then((result) => {
                return res.status(200).json(result.recordset);
            })
            .catch((selectError) => {
                return res.status(400).json({ error: 'data_error_reading_images' });
            });
    });
});

module.exports = router;
