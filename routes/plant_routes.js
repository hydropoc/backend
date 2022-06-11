const express = require('express');
const { body, validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const config = require('./../config');

const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.use('/photos', express.static(path.join(__dirname, '..', 'photos')));

router.post('/pictures', body('startTime').isNumeric(), body('endTime').isNumeric(), (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    fs.readdir(path.join(__dirname, '..', 'photos'), (error, files) => {
        if (error) {
            res.status(400).json({ error });
            throw error;
        }

        const promises = [];
        files.forEach((file) => {
            promises.push(
                new Promise((resolve, reject) => {
                    const filename = path.join(__dirname, '..', 'photos', file);

                    fs.stat(filename, (error, stats) => {
                        if (error) {
                            res.status(400).json({ error });
                            throw error;
                        }

                        resolve({ filename, stats });
                    });
                })
            );
        });

        Promise.all(promises).then((data) => {
            const pictures = [];

            data.forEach((file) => {
                if (Math.floor(file.stats.birthtimeMs) >= req.body['startTime'] && Math.floor(file.stats.birthtimeMs) <= req.body['endTime'])
                    pictures.push({
                        filename: config.pictureUrl + file.filename.replace(path.join(__dirname, '..', 'photos/').toString(), ''),
                        creationTime: Math.floor(file.stats.birthtimeMs),
                    });
            });

            return res.status(200).json(
                pictures.sort((a, b) => {
                    return b.creationTime - a.creationTime;
                })
            );
        });
    });
});

module.exports = router;
