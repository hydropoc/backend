const ora = require('ora');
const gpioUtils = require('./../lib/gpioUtils');
const config = require('./../config');

ora().succeed('[Jobs] Started Lightcycle job');

setInterval(() => {
    if (checkIfTimeIsBetween()) {
        gpioUtils
            .setPinState(config.gpio['lamp_pin'], 1)
            .then(() => undefined)
            .catch(() => undefined);
    } else {
        gpioUtils
            .setPinState(config.gpio['lamp_pin'], 0)
            .then(() => undefined)
            .catch(() => undefined);
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
