module.exports = {
    name: 'pause',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}pause',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - Вы находитесь на другом голосовом канале!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - В данный момент музыка не воспроизводится!`);

        if (client.player.getQueue(message).paused) return message.channel.send(`${client.emotes.error} - Музыка уже остановлена!`);

        client.player.pause(message);

        message.channel.send(`${client.emotes.success} - Песня ${client.player.getQueue(message).playing.title} была остановлена !`);
    },
};