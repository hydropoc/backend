const ora = require('ora');
const database = require('./database');
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

    database.sql.connect(config.sqlConfig, (error) => {
        if (error) {
            statusMessageDatabase.fail('Database connection error');
            return gracefulShutdown('Database connection error');
        }

        statusMessageDatabase.succeed('Database connected');
    });

    statusMessageBackend.succeed('Backend started on port ' + config.port);
}).on('error', (error) => {
    statusMessageBackend.fail('Backend failed to start (' + error.message + ')');
    process.exit();
});
