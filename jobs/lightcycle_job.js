const ora = require('ora');
const config = require('./../config');
const Gpio = require('onoff').Gpio;

const lamp = new Gpio(config.gpio['lamp_pin'], 'out');

ora().succeed('[Jobs] Started Lightcycle job');

setInterval(() => {
    if (checkIfTimeIsBetween()) {
        lamp.read()
            .then((value) => {
                if (value != 0) lamp.write(0);
            })
            .catch((err) => console.log(err));
    } else {
        lamp.read()
            .then((value) => {
                if (value != 1) lamp.write(1);
            })
            .catch((err) => console.log(err));
    }
}, 1000);

function checkIfTimeIsBetween() {
    const time = new Date();
    const timeStart = new Date();
    const timeEnd = new Date();

    timeStart.setHours(parseInt(config.lightcycle.startTime.split(':')[0]));
    timeStart.setMinutes(parseInt(config.lightcycle.startTime.split(':')[1]));
    timeStart.setSeconds(0);
    timeEnd.setHours(parseInt(config.lightcycle.endTime.split(':')[0]));
    timeEnd.setMinutes(parseInt(config.lightcycle.endTime.split(':')[1]));
    timeEnd.setSeconds(0);

    return time.getTime() >= timeStart.getTime() && time.getTime() <= timeEnd.getTime();
}
