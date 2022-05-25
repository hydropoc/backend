const os = require('os');

function togglePump(id, state) {
    return new Promise((resolve, reject) => {
        if (os.platform() != 'linux') {
            return reject('invalid_operating_system');
        }

        const Gpio = require('onoff').Gpio;

        switch (id) {
            case 1:
                new Gpio(5, 'out').write(!state, (error) => {
                    // GPIO 5 on Rasberry Pi is connected to the pump 1
                    if (error) return reject('write_error');
                    return resolve(null);
                });
                break;
            case 2:
                new Gpio(6, 'out').write(!state, (error) => {
                    // GPIO 6 on Rasberry Pi is connected to the pump 1
                    if (error) return reject('write_error');
                    return resolve(null);
                });
                break;
            case 3:
                new Gpio(13, 'out').write(!state, (error) => {
                    // GPIO 13 on Rasberry Pi is connected to the pump 1
                    if (error) return reject('write_error');
                    return resolve(null);
                });
                break;
            case 4:
                new Gpio(19, 'out').write(!state, (error) => {
                    // GPIO 19 on Rasberry Pi is connected to the pump 1
                    if (error) return reject('write_error');
                    return resolve(null);
                });
                break;
            case 5:
                new Gpio(26, 'out').write(state, (error) => {
                    // GPIO 26 on Rasberry Pi is connected to the pump 1
                    if (error) return reject('write_error');
                    return resolve(null);
                });
                break;
            default:
                reject('invalid_pump_id');
                break;
        }
    });
}

function toggleVentilation(state) {
    return new Promise((resolve, reject) => {
        if (os.platform() != 'linux') {
            return reject('invalid_operating_system');
        }

        const Gpio = require('onoff').Gpio;

        new Gpio(15, 'out').write(!state, (error) => {
            // GPIO 15 on Rasberry Pi is connected to the ventilation
            if (error) return reject('write_error');
            return resolve(null);
        });
    });
}

function toggleLamp(state) {
    return new Promise((resolve, reject) => {
        if (os.platform() != 'linux') {
            return reject('invalid_operating_system');
        }

        const Gpio = require('onoff').Gpio;

        new Gpio(14, 'out').write(!state, (error) => {
            // GPIO 14 on Rasberry Pi is connected to the lamp
            if (error) return reject('write_error');
            return resolve(null);
        });
    });
}

function togglePumpFront(state) {
    return new Promise((resolve, reject) => {
        if (os.platform() != 'linux') {
            return reject('invalid_operating_system');
        }

        const Gpio = require('onoff').Gpio;

        new Gpio(23, 'out').write(!state, (error) => {
            // GPIO 23 on Rasberry Pi is connected to the Pump Front
            if (error) return reject('write_error');
            return resolve(null);
        });
    });
}

function togglePumpBack(state) {
    return new Promise((resolve, reject) => {
        if (os.platform() != 'linux') {
            return reject('invalid_operating_system');
        }

        const Gpio = require('onoff').Gpio;

        new Gpio(18, 'out').write(!state, (error) => {
            // GPIO 18 on Rasberry Pi is connected to the Pump Back
            if (error) return reject('write_error');
            return resolve(null);
        });
    });
}

module.exports.togglePump = togglePump;
module.exports.toggleVentilation = toggleVentilation;
module.exports.toggleLamp = toggleLamp;
module.exports.togglePumpFront = togglePumpFront;
module.exports.togglePumpBack = togglePumpBack;
