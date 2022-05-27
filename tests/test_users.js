const axios = require('axios');
var count = 1;

//generate random number between two given values
function randomNumber(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

//generate random names with specific number of characters
function randomName(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

console.log('Starting adding random accounts to mssql server!');

setInterval(() => {
    axios
        .post(
            'http://localhost:3000/api/user/register',
            JSON.stringify({
                username: randomName(randomNumber(4, 8)),
                password: randomName(randomNumber(6, 20)),
            }),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        .then((res) => {
            console.log('Added user (' + count + ')');
            count++;
        })
        .catch((error) => {
            console.error(error);
        });
}, 4000);
