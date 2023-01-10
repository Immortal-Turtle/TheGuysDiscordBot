const { SlashCommandBuilder } = require('discord.js');

const foodOptions = [ 'Chinese food', 'Sushi', 'Ramen', 'Burgers', 'Fried Chicken', 'Pizza', 'Vietnamese food', 'Other food', 'Pasta' ];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whatsfordinner')
        .setDescription('The bot decides what to eat for dinner.'),
    async execute(interaction) {
        const chosenFood = foodOptions[Math.floor(Math.random() * foodOptions.length)];
        await interaction.reply({ content: `${chosenFood} is for dinner! 🤤 Bon appétit!`})
    },
};