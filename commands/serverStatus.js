const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-status')
        .setDescription('Get the status of the dedicated server'),
    async execute(interaction) {
        let filename = "";
        let servername = "";
        switch (interaction.channelId){
            case '1060412347778338836': //project-zomboid channel
                servername = "Project Zomboid";
                filename = 'zomboidServerStatus.txt';
                break;
            case '1045231799632154724': //valheim channel
                servername = "Valheim";
                filename = 'valheimServerStatus.txt';
                break;
        }

        var filePath = path.join('./', filename);

        fs.readFile(filePath, async (err, serverStatus) => {
            if (err) throw err;
            console.log(serverStatus);
            await interaction.reply({ content: `The ${servername} server is currently ${serverStatus}`, ephemeral: false });
        });
    },
};