const Discord = require('discord.js');
module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    category: 'Music',
    utilisation: '{prefix}nowplaying',
    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Вы не в голосовом канале !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - Вы находитесь на другом голосовом канале!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - В данный момент музыка не воспроизводится!`);

        const track = client.player.nowPlaying(message);

                const embed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .addFields(
                    { name: 'Канал', value: track.author, inline: true },
                    { name: 'Запрошено пользователем:', value: track.requestedBy.username, inline: true },
                    { name: 'Из плейлиста:', value: track.fromPlaylist ? 'Да' : 'Нету', inline: true },

                    { name: 'Просмотры', value: track.views, inline: true },
                    { name: 'Продолжительность', value: track.duration, inline: true },

                    { name: 'Громкость', value: client.player.getQueue(message).volume, inline: true },
                    { name: 'Режим повторения', value: client.player.getQueue(message).repeatMode ? 'Включен' : 'Не включен', inline: true },
                    { name: 'Пауза', value: client.player.getQueue(message).paused ? 'Есть' : 'Нету', inline: true },

                    { name: 'Индикатор', value: client.player.createProgressBar(message, { timecodes: true }), inline: true }
                )
                message.channel.send(embed)
            
        
    },
};