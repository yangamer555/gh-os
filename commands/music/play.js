module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'Music',
    utilisation: '{prefix}play [name/URL]',

    execute(client, message, args) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Вы не в голосовом канале!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - Вы находитесь на другом голосовом канале!`);

        if (!args[0]) return message.channel.send(`${client.emotes.error} - Пожалуйста введите название песни!`);

        client.player.play(message, args.join(" "), { firstResult: true });
    },
};