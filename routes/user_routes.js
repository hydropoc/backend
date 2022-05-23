const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/example_1', function (req, res) {
    res.send('User 1 route');
});

router.get('/example_2', function (req, res) {
    res.send('User 2 route');
});

module.exports = router;
