const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const foodOptions = [ 'Chinese food', 'Sushi', 'Ramen', 'Burgers', 'Fried Chicken', 'Pizza', 'Vietnamese food', 'Other food' ];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whatsfordinner')
        .setDescription('The bot decides what to eat for dinner.'),
    async execute(interaction) {
        const chosenFood = Math.floor(Math.random() * foodOptions.length)
        await interaction.reply({ content: `${chosenFood} is for dinner! 🤤 Bon appétit!`})
    },
};