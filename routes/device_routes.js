const express = require('express');
const os = require('os');

const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/informations', function (req, res) {
    res.send({
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

module.exports = router;
