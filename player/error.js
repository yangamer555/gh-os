module.exports = (client, error, message) => {
    switch (error) {
        case 'NotPlaying':
            message.channel.send(`${client.emotes.error} - На этом сервере не воспроизводится музыка!`);
            break;
        case 'NotConnected':
            message.channel.send(`${client.emotes.error} - Вы не подключены ни к одному из голосовых каналов!`);
            break;
        case 'UnableToJoin':
            message.channel.send(`${client.emotes.error} - Я не могу присоединиться к вашему голосовому каналу, проверьте мои разрешения!`);
            break;
        default:
            message.channel.send(`${client.emotes.error} - Что-то пошло не так ... **ERROR** : ${error}`);
    };
};
