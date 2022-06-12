const os = require('os');
const eventUtils = require('./eventUtils');

function setPinState(pin, state) {
    if (os.platform() != 'linux') {
        eventUtils.addEvent('error', 'Invalid operating system GPIO not supported.');
        return;
    }

    const Gpio = require('onoff').Gpio;
    const port = new Gpio(pin, 'out');

    if (port.readSync() == state) {
        eventutils.addEvent('error', 'Pin ' + pin + ' already in this state (' + state + ').');
        return;
    }

    port.writeSync(state);
    eventUtils.addEvent('success', 'Pin ' + pin + ' set to ' + state + '.');
}

module.exports.setPinState = setPinState;
