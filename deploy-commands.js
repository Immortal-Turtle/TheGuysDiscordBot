require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const logger = require('./utils/logger');

// Application ID
const clientId = process.env.CLIENT_ID; 
// Server or channel ID
const theGuysGuildId = process.env.THE_GUYS_GUILD_ID;
const th5GuildId = process.env.TH5_GUILD_ID;
// Application bot token
const token = process.env.DISCORD_TOKEN;

const theGuysCommands = [];
const th5Commands = [];

// Grab all the command files from the commands directory you created earlier
const theGuysCommandFiles = fs.readdirSync('./commands/theGuysCommands').filter(file => file.endsWith('.js'));
const th5CommandFiles = fs.readdirSync('./commands/th5Commands').filter(file => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of theGuysCommandFiles) {
	const command = require(`./commands/theGuysCommands/${file}`);
	theGuysCommands.push(command.data.toJSON());
}

for (const file of th5CommandFiles) {
	const command = require(`./commands/th5Commands/${file}`);
	th5Commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
	try {
		//
		// Update commands for The Guys server
		//
		logger.info(`Started refreshing ${theGuysCommands.length} application (/) commands for The Guys server.`);

		// The put method is used to fully refresh all commands in The Guys guild with the current set
		const theGuysData = await rest.put(
			Routes.applicationGuildCommands(clientId, theGuysGuildId),
			{ body: theGuysCommands },
		);

		logger.info(`Successfully reloaded ${theGuysData.length} application (/) commands for The Guys server.`);

		//
		// Update commands for TH5 server
		//
		logger.info(`Started refreshing ${th5Commands.length} application (/) commands for TH5 server.`);

		// The put method is used to fully refresh all commands in the TH5 guild with the current set
		const th5Data = await rest.put(
			Routes.applicationGuildCommands(clientId, th5GuildId),
			{ body: th5Commands },
		);

		logger.info(`Successfully reloaded ${th5Data.length} application (/) commands for TH5 server.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		logger.error(error);
	}
})();