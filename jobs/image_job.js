const Raspistill = require('node-raspistill').Raspistill;
const ora = require('ora');
const eventUtils = require('./../lib/eventUtils');
const config = require('./../config.json');

ora().succeed('[Jobs] Started Image job');

var lastImage = new Date(null);
const camera = new Raspistill({
    encoding: 'png',
    fileName: '',
});

setInterval(() => {
    const currentTime = new Date();

    if ((currentTime.getTime() - lastImage.getTime()) / 1000 > config.pictureDelay) {
        lastImage = currentTime;

        takePhoto();
    }
}, 1000);

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
