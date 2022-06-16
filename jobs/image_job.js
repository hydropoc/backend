const Raspistill = require('node-raspistill').Raspistill;
const ora = require('ora');
const eventUtils = require('./../lib/eventUtils');
const config = require('./../config.json');

ora().succeed('[Jobs] Started Image job');

takePhoto();
setInterval(() => {
    takePhoto();
}, config.pictureDelay * 1000);

function takePhoto() {
    const fileName = ('Wachstum ' + new Date().toLocaleString('de-DE').toString()).replaceAll(':', '-');

    new Raspistill({
        encoding: 'png',
        fileName,
    })
        .takePhoto()
        .then((photo) => {
            const nextPicture = new Date();
            nextPicture.setSeconds(nextPicture.getSeconds() + config.pictureDelay);

            ora().succeed('[Jobs] Created photo! New photo will be created at ' + nextPicture.toLocaleString('de-DE').toString());
            eventUtils.addEvent('success', 'Picture taken');
        })
        .catch((error) => eventUtils.addEvent('error', 'Camera not found - check if camera is connected'));
}
