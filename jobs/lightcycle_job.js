const ora = require('ora');
const config = require('./../config');
const gpioUtils = require('./../gpioUtils');

ora().succeed('[Jobs] Started Lightcycle job');

setInterval(() => {
    gpioUtils.ports.socketBottomRight.writeSync(checkIfTimeIsBetween() ? 1 : 0);
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
