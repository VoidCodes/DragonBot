const Discord = require("discord.js");
const fs = require("fs");
let config = require("../botconfig.json");

module.exports.noPerms = (message, perm) => {
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setTitle("Insufficient Perms")
    .setColor(config.red)
    .addField("Permisssion needed", perm);

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.equalPerms = (message, user, perms) => {

   let embed = new Discord.RichEmbed()
   .setAuthor(message.author.username)
   .setColor(config.red)
   .setTitle("Error")
   .addField(`${user} has perms`, perms);

   message.channel.send(embed).then(m => m.delete(5000));

}

module.exports.botuser = (message) => {
    let embed = new Discord.RichEmbed()
    .setTitle("Error")
    .setDescription("you cant ban my bot LOL XD")
    .setColor(config.red)

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.cantfindUser = (channel) => {
    let embed = new Discord.RichEmbed()
    .setTitle("Error")
    .setDescription("Cant find user UwU")
    .setColor(config.red)

    channel.send(embed).then(m => m.delete(5000));
}

module.exports.noReason = (channel) => {
    let embed = new Discord.RichEmbed()
    .setTitle("Error")
    .setDescription("Reason for ban")
    .setColor(config.red)

    channel.send(embed).then(m => m.delete(5000));
}
