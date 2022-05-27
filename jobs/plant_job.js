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
    //gpioUtils.toggleVentilation(/* STATE (1 = ON, 0 = OFF) */);
    //gpioUtils.toggleLamp(/* STATE (1 = ON, 0 = OFF) */);
    //gpioUtils.togglePumpFront(/* STATE (1 = ON, 0 = OFF) */);
    //gpioUtils.togglePumpBack(/* STATE (1 = ON, 0 = OFF) */);
}, 3000);
