module.exports = (client, message, queue) => {
    message.channel.send(`${client.emotes.error} - Музыка остановилась, поэтому я вышел!`);
};