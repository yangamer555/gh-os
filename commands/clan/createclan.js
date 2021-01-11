const Discord = require('discord.js');
const db = require(`quick.db`)
const moment = require("moment");

module.exports = {
    name: 'createclan',
    aliases: ['cc'],
    category: 'clan',
    utilisation: '{prefix}clan <name>',

async execute( client, message, args, color){     
  
  let name = args.splice(0).join(" ")
       if (!name) return message.channel.send("Введите название клана! ")
         if (message.author.bot) return message.channel.send(`**Бот не может использовать кланы!**`)

  let clanowner = message.author.username
  let clanownerid = message.author.id
  let clanowneravatar = message.author.displayAvatarURL
  let clanownertag = message.author.tag

  //Other
  let names = name
  let date = moment().format('MMMM Do YYYY, h:mm:ss a')

  let clans = await db.fetch(`customclans_${name}`)

    if (clans) return message.channel.send(`**Ошибка при попытке создать клан** ❌\n\n*Клан с названием **\`${name}\`** уже есть!*`);
 if (!clans) return message.channel.send(`**Вы уже есть в клане!** ❌`);

        db.set(`customclans_${name}.name`, names) // Name of Clan
        db.set(`customclans_${name}.clanowner`, clanowner) // Owner of Clan
        db.set(`customclans_${name}.clanownerid`, clanownerid) // Owner ID of Clan
        db.set(`customclans_${name}.clanownertag`, clanownertag) // Owner ID of Clan
        db.set(`customclans_${name}.clanowneravatar`, clanowneravatar) // Owner Avatar of Clan user.tag
        db.set(`customclans_${name}.date`, date) //Date clan was created

        let embed = new Discord.RichEmbed()
        .setTitle(`**Custom Clans**`)
        .setDescription(`**Вы создали клан!** ✅\n\n**Tag Name »** ${name}\n*View your clan with **n!claninfo***`)
        .setColor(`#39db69`)
        .setFooter(`Note: Clans are Global across servers.`)

        message.channel.send(embed)

}
}

