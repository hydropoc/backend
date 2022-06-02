const ora = require('ora');
const gpioUtils = require('./../lib/gpioUtils');
const eventUtils = require('./../lib/eventUtils');
const config = require('./../config');

ora().succeed('[Jobs] Started Lightcycle job');

const time = new Date();
if (time.getHours() >= parseInt(config.lightcycle.startTime.split(':')[0]) && time.getHours() <= parseInt(config.lightcycle.endTime.split(':')[0])) {
    if (time.getMinutes() >= parseInt(config.lightcycle.startTime.split(':')[1]) && time.getMinutes() <= parseInt(config.lightcycle.endTime.split(':')[1])) {
        gpioUtils
            .toggleLamp(true)
            .then(() => {
                ora().succeed("Set lamp to state 'on'");
            })
            .catch(() => undefined);
    }
}

setInterval(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    const timeStartEquals = currentHour == parseInt(config.lightcycle.startTime.split(':')[0]) && currentMinute == parseInt(config.lightcycle.startTime.split(':')[1]);
    const timeEndEquals = currentHour == parseInt(config.lightcycle.endTime.split(':')[0]) && currentMinute == parseInt(config.lightcycle.endTime.split(':')[1]);

    if (timeStartEquals && timeEndEquals) {
        ora().fail('Invalid time entered in lightcycle configuration');
        eventUtils.addEvent('error', 'Invalid time entered in lightcycle configuration');
        throw new Error('Invalid time entered in lightcycle configuration');
    }

    if (timeStartEquals) {
        gpioUtils
            .toggleLamp(true)
            .then(() => {
                ora().succeed("Set lamp to state 'on'");
            })
            .catch(() => undefined);
    }

    if (timeEndEquals) {
        gpioUtils
            .toggleLamp(false)
            .then(() => {
                ora().succeed("Set lamp to state 'off'");
            })
            .catch(() => undefined);
    }
}, 60000); // Repeat every 60000 milliseconds (1 minute)
