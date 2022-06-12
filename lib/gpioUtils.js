const os = require('os');
const eventUtils = require('./eventUtils');
const config = require('./../config');

function setPinState(pin, state) {
    return new Promise((resolve, reject) => {
        if (os.platform() != 'linux' || config.development) {
            return reject('invalid_operating_system');
        }

        const Gpio = require('onoff').Gpio;
        const port = new Gpio(pin, 'out');

        port.read((readError, value) => {
            if (readError) {
                port.unexport();

                eventUtils.addEvent('error', 'Cant read pin ' + pin);
                return reject('read_error');
            }

            if (value == state) {
                port.unexport();
                return resolve(null);
            } else
                port.write(state, (writeError) => {
                    port.unexport();

                    if (writeError) {
                        eventUtils.addEvent('error', 'Cant write pin ' + pin + ' to state: ' + state);
                        return reject('write_error');
                    }

                    eventUtils.addEvent('success', 'Set pin ' + pin + ' to state: ' + state);
                    return resolve(null);
                });
        });
    });
}

module.exports.setPinState = setPinState;
