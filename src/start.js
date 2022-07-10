require('cute-logs');
const applicationConfig = require('./application.json');
console.info(`${applicationConfig.name} is loading...`, "LOADING");

const { writeFileSync, readFileSync } = require('fs');
const Logger = require('./lib/fileLogger');
const logger = global.logger = new Logger();

try {
    const config = global.config = JSON.parse(readFileSync('./config.json'));
    const axios = require('axios');

    if (!config.licenseKey) {
        return logger.send("License key is missing");
    }

    axios.post(applicationConfig.licenseApi, {
        key: config.licenseKey
    }).then(res => {
        if (res.data.status === "success") {
            console.info(`${applicationConfig.name} is loaded!`, "LOADED");
            console.info(`Starting application...`, "LOADING");
            require('./client');
        } else {
            return logger.send(res.data.message ?? "License key is invalid");
        }
    }).catch(err => {
        logger.send(err.message);
    });
} catch (err) {
    logger.send('(!) config.json not found.');
    writeFileSync('./config.json', JSON.stringify(require('./config.default.json'), null, 4));
};

setInterval(() => {}, 999000); // Keep the process alive
