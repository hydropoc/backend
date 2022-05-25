const Raspistill = require('node-raspistill').Raspistill;
const eventUtils = require('./../lib/eventUtils');

const camera = new Raspistill();

camera
    .takePhoto()
    .then((photo) => {
        console.log('photo taken, todo!');
        console.log('add image to db');

        eventUtils.addEvent('success', 'Picture taken');

        /*
        database.sql.connect(database.sqlConfig).then((pool) => {
        pool.query("INSERT INTO [HydroPoc].[dbo].[images] (data, timestamp) VALUES ('" + fileName + "', " + new Date().getTime() + ')')
            .then((result) => {
                console.log(result);
                pool.close();
            })
            .catch((selectError) => {
                console.log(selectError);
            });
        });
        */
    })
    .catch((error) => {
        eventUtils.addEvent('error', 'Camera not found - check if camera is connected');
    });
