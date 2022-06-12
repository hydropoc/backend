const ora = require('ora');
const database = require('./../database');
const gpioUtils = require('./../lib/gpioUtils');

ora().succeed('[Jobs] Started Plant job');

setInterval(() => {
    //check sensor values
    //check if some shit is running
    //check sensors
    //toggle ports
    //gpio utils can be used
    //get current plant profile
    //gpioUtils.togglePump(/* ID (1 - 5) and STATE (1 = ON, 0 = OFF) */);
    //gpioUtils.setPinState(config.gpio['fan_pin'], 0 or 1);
    //gpioUtils.setPinState(config.gpio['lamp_pin'], 0 or 1);
    //gpioUtils.setPinState(config.gpio['pump_front'], 0 or 1);
    //gpioUtils.setPinState(config.gpio['pump_back'], 0 or 1);
}, 3000);
