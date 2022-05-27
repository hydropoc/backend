const express = require('express');
const os = require('os');
const { body, validationResult } = require('express-validator');
const database = require('./../database');
const config = require('./../config');

const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/informations', function (req, res) {
    res.status(200).send({
        version: config.version,
        arch: os.arch(),
        cpus: os.cpus(),
        freememory: os.freemem(),
        hostname: os.hostname(),
        loadavg: os.loadavg(),
        networkInterfaces: os.networkInterfaces(),
        platform: os.platform(),
        release: os.release(),
        totalmem: os.totalmem(),
        type: os.type(),
        uptime: os.uptime(),
    });
});

router.get('/logs', body('amount').isInt({ min: 1, max: 100 }), (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    database.sql.connect(database.sqlConfig).then((pool) => {
        pool.query('SELECT TOP ' + req.body.amount + ' * FROM [HydroPoc].[dbo].[events] ORDER BY id DESC')
            .then((result) => {
                return res.status(200).json(result.recordset);
            })
            .catch((selectError) => {
                console.error(selectError);
                return res.status(400).json({ error: 'data_error_reading_logs' });
            });
    });
});

module.exports = router;
