module.exports = (client, message, queue) => {
    message.channel.send(`${client.emotes.error} - Музыка остановлена, ибо в голосовом канале не осталось пользователей!`);
};