const axios = require('axios');
var count = 1;

// generate random number between two given values
function randomNumber(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

console.log('Starting adding random data to mssql server!');

setInterval(() => {
    axios
        .post(
            'http://hydropoc.api.jongmans.net/api/sensor/adddata',
            JSON.stringify({
                temperature_water: randomNumber(20, 25),
                temperature_air: randomNumber(22, 29),
                humidity: randomNumber(40, 55),
                co2_level: Math.floor(randomNumber(500, 600)),
                ph_value: Math.floor(randomNumber(5, 7)),
                ec_value: Math.floor(randomNumber(700, 900)),
                swimmer_1: 0,
                swimmer_2: 0,
                swimmer_3: Math.floor(randomNumber(230, 400)),
            }),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        .then((res) => {
            console.log('Added data (' + count + ')');
            count++;
        })
        .catch((error) => {
            console.error(error);
        });
}, 5000);
