require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const logger = require('./utils/logger');

process.title = 'The Guys Discord Bot'

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const th5CommandsPath = path.join(__dirname, 'commands/th5Commands');
const th5CommandFiles = fs.readdirSync(th5CommandsPath).filter(file => file.endsWith('.js'));

for (const file of th5CommandFiles){
    const filePath = path.join(th5CommandsPath, file);
    const command = require(filePath);

    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        logger.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

const theGuysCommandsPath = path.join(__dirname, 'commands/theGuysCommands');
const theGuysCommandFiles = fs.readdirSync(theGuysCommandsPath).filter(file => file.endsWith('.js'));

for (const file of theGuysCommandFiles){
    const filePath = path.join(theGuysCommandsPath, file);
    const command = require(filePath);

    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        logger.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles){
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(process.env.DISCORD_TOKEN);

fs.writeFile('bot_info.txt', `pid ${process.pid}`, function (err) {
    logger.error(err);
});