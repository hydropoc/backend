const os = require('os');
const eventUtils = require('./eventUtils');

function togglePump(id, state) {
    return new Promise((resolve, reject) => {
        if (os.platform() != 'linux') {
            eventUtils.addEvent('error', 'Invalid operating system GPIO not supported.');
            return reject('invalid_operating_system');
        }

        const Gpio = require('onoff').Gpio;

        switch (id) {
            case 1:
                new Gpio(5, 'out').write(!state, (error) => {
                    // GPIO 5 on Rasberry Pi is connected to the pump 1
                    if (error) {
                        eventUtils.addEvent('error', 'Cant set pump 1 to state: ' + !state);
                        return reject('write_error');
                    }

                    eventUtils.addEvent('success', 'Set pump 1 to state: ' + !state);
                    return resolve(null);
                });
                break;
            case 2:
                new Gpio(6, 'out').write(!state, (error) => {
                    // GPIO 6 on Rasberry Pi is connected to the pump 1
                    if (error) {
                        eventUtils.addEvent('error', 'Cant set pump 2 to state: ' + !state);
                        return reject('write_error');
                    }

                    eventUtils.addEvent('success', 'Set pump 2 to state: ' + !state);
                    return resolve(null);
                });
                break;
            case 3:
                new Gpio(13, 'out').write(!state, (error) => {
                    // GPIO 13 on Rasberry Pi is connected to the pump 1
                    if (error) {
                        eventUtils.addEvent('error', 'Cant set pump 3 to state: ' + !state);
                        return reject('write_error');
                    }

                    eventUtils.addEvent('success', 'Set pump 3 to state: ' + !state);
                    return resolve(null);
                });
                break;
            case 4:
                new Gpio(19, 'out').write(!state, (error) => {
                    // GPIO 19 on Rasberry Pi is connected to the pump 1
                    if (error) {
                        eventUtils.addEvent('error', 'Cant set pump 4 to state: ' + !state);
                        return reject('write_error');
                    }

                    eventUtils.addEvent('success', 'Set pump 4 to state: ' + !state);
                    return resolve(null);
                });
                break;
            case 5:
                new Gpio(26, 'out').write(state, (error) => {
                    // GPIO 26 on Rasberry Pi is connected to the pump 1
                    if (error) {
                        eventUtils.addEvent('error', 'Cant set pump 5 to state: ' + state);
                        return reject('write_error');
                    }

                    eventUtils.addEvent('success', 'Set pump 5 to state: ' + state);
                    return resolve(null);
                });
                break;
            default:
                eventUtils.addEvent('error', 'Cant set pump with ' + id + " because it's not connected.");
                reject('invalid_pump_id');
                break;
        }
    });
}

function toggleVentilation(state) {
    return new Promise((resolve, reject) => {
        if (os.platform() != 'linux') {
            eventUtils.addEvent('error', 'Invalid operating system GPIO not supported.');
            return reject('invalid_operating_system');
        }

        const Gpio = require('onoff').Gpio;

        new Gpio(15, 'out').write(!state, (error) => {
            // GPIO 15 on Rasberry Pi is connected to the ventilation
            if (error) {
                eventUtils.addEvent('error', 'Cant set ventilation to state: ' + !state);
                return reject('write_error');
            }

            eventUtils.addEvent('success', 'Set ventilation to state: ' + !state);
            return resolve(null);
        });
    });
}

function toggleLamp(state) {
    return new Promise((resolve, reject) => {
        if (os.platform() != 'linux') {
            eventUtils.addEvent('error', 'Invalid operating system GPIO not supported.');
            return reject('invalid_operating_system');
        }

        const Gpio = require('onoff').Gpio;

        new Gpio(14, 'out').write(!state, (error) => {
            // GPIO 14 on Rasberry Pi is connected to the lamp
            if (error) {
                eventUtils.addEvent('error', 'Cant set lamp to state: ' + !state);
                return reject('write_error');
            }

            eventUtils.addEvent('success', 'Set lamp to state: ' + !state);
            return resolve(null);
        });
    });
}

function togglePumpFront(state) {
    return new Promise((resolve, reject) => {
        if (os.platform() != 'linux') {
            eventUtils.addEvent('error', 'Invalid operating system GPIO not supported.');
            return reject('invalid_operating_system');
        }

        const Gpio = require('onoff').Gpio;

        new Gpio(23, 'out').write(!state, (error) => {
            // GPIO 23 on Rasberry Pi is connected to the Pump Front
            if (error) {
                eventUtils.addEvent('error', 'Cant set Pump Front to state: ' + !state);
                return reject('write_error');
            }

            eventUtils.addEvent('success', 'Set Pump Front to state: ' + !state);
            return resolve(null);
        });
    });
}

function togglePumpBack(state) {
    return new Promise((resolve, reject) => {
        if (os.platform() != 'linux') {
            eventUtils.addEvent('error', 'Invalid operating system GPIO not supported.');
            return reject('invalid_operating_system');
        }

        const Gpio = require('onoff').Gpio;

        new Gpio(18, 'out').write(!state, (error) => {
            // GPIO 18 on Rasberry Pi is connected to the Pump Back
            if (error) {
                eventUtils.addEvent('error', 'Cant set Pump Back to state: ' + !state);
                return reject('write_error');
            }

            eventUtils.addEvent('success', 'Set Pump Back to state: ' + !state);
            return resolve(null);
        });
    });
}

module.exports.togglePump = togglePump;
module.exports.toggleVentilation = toggleVentilation;
module.exports.toggleLamp = toggleLamp;
module.exports.togglePumpFront = togglePumpFront;
module.exports.togglePumpBack = togglePumpBack;
