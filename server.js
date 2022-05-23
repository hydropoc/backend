const ora = require('ora');
const app = require('./app');
const config = require('./config');

const gracefulShutdown = (msg) => {
    ora().succeed('Shutdown initiated: ' + msg);
    ora().succeed('Shutting down...');

    process.exit();
};

const statusMessageBackend = ora('Loading backend').start();
const statusMessageDatabase = ora('Loading database').start();

app.listen(3000, () => {
    process.on('SIGTERM', gracefulShutdown); // Handle kill commands
    process.on('SIGINT', gracefulShutdown); // Handle interrupts
    process.on('uncaughtException', gracefulShutdown); // Prevent dirty exit on uncaught exceptions
    process.on('unhandledRejection', gracefulShutdown); // Prevent dirty exit on unhandled promise rejection

    statusMessageBackend.succeed('Backend started on port ' + config.port);
}).on('error', (error) => {
    statusMessageBackend.fail('Backend failed to start (' + error.message + ')');
    process.exit();
});
