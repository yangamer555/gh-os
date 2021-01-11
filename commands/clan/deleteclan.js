const Discord = require('discord.js');
const db = require(`quick.db`)
const moment = require("moment");

module.exports = {
    name: 'deleteclan',
    aliases: ['dc'],
    category: 'clan',
    utilisation: '{prefix}deleteclan <name>',

async execute( client, message, args, color){ 

let name = args.splice(0).join(" ")
       if (!name) return message.channel.send("Введите название клана! ")
  
   let clans = await db.fetch(`customclans_${name}`)
   let ownerclan = db.get(`customclans_${name}.clanowner`)
   let clanownerid = db.get(`customclans_${name}.clanownerid`) // Owner ID of Clan
   let clanownertag = db.get(`customclans_${name}.clanownertag`) // Owner ID of Clan
   let clanowneravatar = db.get(`customclans_${name}.clanowneravatar`) // Owner Avatar of Clan user.tag
   let date = db.get(`customclans_${name}.date`)
   if(!ownerclan)return message.channel.send("Вы не владелец этого клана!")
  else{
    db.delete(`customclans_${name}`)
    db.delete(`customclans_${name}.clanownerid`) // Owner ID of Clan
    db.delete(`customclans_${name}.clanownertag`) // Owner ID of Clan
    db.delete(`customclans_${name}.clanowneravatar`) // Owner Avatar of Clan user.tag
    db.delete(`customclans_${name}.date`)
    message.channel.send("Клан был успешно удален!")
  }

}}