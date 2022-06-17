const Raspistill = require('node-raspistill').Raspistill;
const ora = require('ora');
const eventUtils = require('./../lib/eventUtils');
const config = require('./../config.json');

ora().succeed('[Jobs] Started Image job');

const camera = new Raspistill({
    encoding: 'png',
    fileName: '',
});

takePhoto();
setInterval(() => {
    takePhoto();
}, config.pictureDelay * 1000);

function takePhoto() {
    camera.setOptions({
        fileName: ('Wachstum ' + new Date().toLocaleString('de-DE').toString()).replaceAll(':', '-'),
    });

    camera
        .takePhoto()
        .then((photo) => {
            const nextPicture = new Date();
            nextPicture.setSeconds(nextPicture.getSeconds() + config.pictureDelay);

            eventUtils.addEvent('success', 'Created photo! New photo will be created at ' + nextPicture.toLocaleString('de-DE').toString());
        })
        .catch((error) => undefined);
}
