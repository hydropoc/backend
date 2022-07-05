const ora = require('ora');
const database = require('./../database');

ora().succeed('[Jobs] Started Plant job');

setInterval(() => {
    //check sensor values
    //check if some shit is running
    //check sensors
    //toggle ports
    //gpio utils can be used
    //get current plant profile
    //
    //gpioUtils.setPinState(config.gpio['pump_small_1'], 0 or 1);
    //gpioUtils.setPinState(config.gpio['pump_small_2'], 0 or 1);
    //gpioUtils.setPinState(config.gpio['pump_small_3'], 0 or 1);
    //gpioUtils.setPinState(config.gpio['pump_small_4'], 0 or 1);
    //gpioUtils.setPinState(config.gpio['pump_small_5'], 0 or 1);
    //
    //gpioUtils.setPinState(config.gpio['fan_pin'], 0 or 1);
    //gpioUtils.setPinState(config.gpio['lamp_pin'], 0 or 1);
    //gpioUtils.setPinState(config.gpio['pump_front'], 0 or 1);
    //gpioUtils.setPinState(config.gpio['pump_back'], 0 or 1);
}, 3000);
