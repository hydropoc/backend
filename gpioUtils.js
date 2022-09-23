const Gpio = require('../onoff').Gpio; // Gpio class
const config = require('./config.json');

const ports = {
    socketTopLeft: new Gpio(config['gpio']['top_left'], 'out'), // Top left socket
    socketTopRight: new Gpio(config['gpio']['top_right'], 'out'), // Top right socket
    socketBottomLeft: new Gpio(config['gpio']['bottom_left'], 'out'), // Bottom left socket
    socketBottomRight: new Gpio(config['gpio']['bottom_right'], 'out'), // Bottom right socket
};

modules.export = ports;
