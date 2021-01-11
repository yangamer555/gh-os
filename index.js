const fs = require('fs');
const Discord = require('discord.js');
const Levels = require("discord-xp");
Levels.setURL("mongodb+srv://yangamer:bavaria1508@cluster0.xqybl.mongodb.net/<dbname>?retryWrites=true&w=majority")
const client = new Discord.Client({ disableMentions: 'everyone' });

const { Player } = require('discord-player');

client.player = new Player(client);
client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.commands = new Discord.Collection();

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

for (const file of player) {
    console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};

client.on("message", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;
  
  const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
  const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
  if (hasLeveledUp) {
    const user = await Levels.fetch(message.author.id, message.guild.id);
    message.channel.send(`${message.author}, поздравляю! Ты поднял свой уровень до **${user.level}**. :tada:`);
  }
});

client.on("message", async (message) => {
   if(message.content.startsWith(`${client.config.discord.prefix}rank`)){
      
      const target = message.mentions.users.first() || message.author; // Grab the target.
 
const user = await Levels.fetch(target.id, message.guild.id); // Selects the target from the database.
 
if (!user) return message.channel.send("Вы отправили слишком мало сообщений"); // If there isnt such user in the database, we send a message in general.
 
message.channel.send(`> **${target.tag}** Сейчас твой лвл: ${user.level}.`); // We show the level.
      
      }
})
  client.on("message", async (message) => {
   if(message.content.startsWith(`${client.config.discord.prefix}leaderboard`)){
     
     const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.
 
if (rawLeaderboard.length < 1) return message("Никого нету в топе");
 
const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.
 
const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.
 
     const embed = new Discord.MessageEmbed()
     .setColor('#FF0000')
     .setDescription(`**Топ**:\n\n${lb.join("\n\n")}`)
     
message.channel.send(embed);
     
   }})
client.login(client.config.discord.token);