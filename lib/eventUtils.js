const database = require('./../database');

function addEvent(type, message) {
    database.sql.connect(database.sqlConfig).then((pool) => {
        pool.query("INSERT INTO [HydroPoc].[dbo].[events] (type, message, timestamp) VALUES ('" + type + "', '" + message + "', " + new Date().getTime() + ')');
    });
}

module.exports.addEvent = addEvent;
