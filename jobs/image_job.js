const database = require('./../database');

const fileName = 'Pflanzenstatus Hauptkamera @ ' + new Date().getTime() + '.png';

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
