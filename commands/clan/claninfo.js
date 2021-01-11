const Discord = require('discord.js');
const db = require(`quick.db`)
const moment = require("moment");

module.exports = {
    name: 'claninfo',
    aliases: ['ci'],
    category: 'clan',
    utilisation: '{prefix}claninfo <name>',

execute( client, message, args, color){ 

let name = args.splice(0).join(" ")
       if (!name) return message.channel.send("Введите название клана")
  
  let names = name
  
  let clanowner = db.get(`customclans_${name}.clanowner`)
  

  if(!clanowner){
    message.channel.send("Клан не найден")
  }
  else{
  message.channel.send(`${clanowner}`)
  }
}}