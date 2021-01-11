module.exports = {
    name: 'volume',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}volume [1-100]',

    execute(client, message, args) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Вы не находитесь в канале!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - Вы находитесь на другом голосовом канале!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - В данный момент музыка не воспроизводится!`);

        if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') return message.channel.send(`${client.emotes.error} - Пожалуйста введите нормальное число`);

        if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return message.channel.send(`${client.emotes.error} - Пожалуйста введите нормальное число (от 1 до 100) !`);

        client.player.setVolume(message, parseInt(args[0]));

        message.channel.send(`${client.emotes.success} - Громкость была изменена на **${parseInt(args[0])}%** !`);
    },
};