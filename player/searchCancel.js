module.exports = (client, message, query, tracks) => {
    message.channel.send(`${client.emotes.error} - Вы не предоставили действительный ответ ... Отправьте команду еще раз !`);
};