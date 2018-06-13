const Discord = require("discord.js");
const moment = require('moment');
require("moment-duration-format");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    let bots = message.guild.members.filter(m => m.user.bot).size;
    let humans = message.guild.members.filter(m => !m.user.bot).size;
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name, true)
    .addField("Created On", `\`${moment.utc(message.guild.createdAt).format("dddd, MMMM Do YYYY")} (${ms(Date.now()- message.guild.createdAt, {long: true})})\``)
    .addField("You Joined", `\`${moment.utc(message.member.joinedAt).format("LTS")} (${ms(Date.now()- message.member.joinedAt, {long: true})})\``)
    .addField("Members", `${humans}`)
    .addField("Bots", `${bots}`)
    .addField("Total Channels", message.guild.channels.size);

    message.channel.send(serverembed);
}

module.exports.help = {
  name:"serverinfo"
}
