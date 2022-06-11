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

    console.log(req.body['startTime'], req.body['endTime']);
    return res.status(200).json([]);
});

module.exports = router;
