const Discord = require('discord.js');
module.exports = (client, message, query, tracks) => {
        const embed = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setDescription(`Вот твои результаты по поиску ${query}`)
            .setTimestamp()
};