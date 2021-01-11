module.exports = (client, message, query) => {
    message.channel.send(`${client.emotes.error} - На YouTube не найдено результатов по запросу ${query} !`);
};