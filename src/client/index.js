const { Intents } = require("discord.js");
const Client = require('@voiddevs.org/slashbot');
const config = global.config;

const applicationConfig = require('../application.json');

const $ = new Client({ 
    token: config.$client.token,
    intents: [
        Intents.FLAGS.GUILDS
    ]
});

$.commandLoader('./src/client/commands/', '.js', (cmd) => {
    console.log(`(!): ${cmd} command loaded.`)
});

$.client.on('ready', () => {
    console.log(`(!): Logged as a ${$.client.user.username}#${$.client.user.discriminator}`)
    console.log(`(!): Developed with ❤️\ \ by ${applicationConfig.developer}`)
    console.log(`(!): Total ${$.commands.length} commands loaded.`)
    try {
        $.client.user.setPresence({
            activities: [
                {
                    name: config.$client.$presence.name,
                    type: config.$client.$presence.type
                }
            ],
            status: config.$client.$presence.status
        });
    } catch (err) {
        global.logger.send(err.message);
    };
});

$.init();

module.exports = $.client;