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

router.get('/logs', body('search').optional().isString(), (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    database.sql.connect(database.sqlConfig).then((pool) => {
        pool.query('SELECT * FROM [HydroPoc].[dbo].[events] ORDER BY id DESC')
            .then((result) => {
                const logs = { draw: 1, recordsTotal: result.recordset.length, recordsFiltered: result.recordset.length, data: [] };

                if (req.body.search == undefined) {
                    result.recordset.forEach((log) => {
                        logs.data.push({
                            id: log.id,
                            timestamp: log.timestamp,
                            type: log.type,
                            message: log.message,
                        });
                    });
                } else {
                    result.recordset.forEach((log) => {
                        if (log.message.toLowerCase().includes(req.body.search.toString().toLowerCase())) {
                            logs.data.push({
                                id: log.id,
                                timestamp: log.timestamp,
                                type: log.type,
                                message: log.message,
                            });
                        }
                    });

                    logs.recordsFiltered = logs.data.length;
                }

                return res.status(200).json(logs);
            })
            .catch((selectError) => {
                console.error(selectError);
                return res.status(400).json({ error: 'data_error_reading_logs' });
            });
    });
});

module.exports = router;
