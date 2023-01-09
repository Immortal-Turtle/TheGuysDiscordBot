const { Events } = require('discord.js');
const logger = require('../utils/logger');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        
        const command = interaction.client.commands.get(interaction.commandName);
        console.log(interaction);
        if (!command){
            logger.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        logger.info(`User [${interaction.member.user.id}] ${interaction.member.user.username} called command '${interaction.commandName}'.`);

        try {
            await command.execute(interaction);
        } catch (error) {
            logger.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    },
};