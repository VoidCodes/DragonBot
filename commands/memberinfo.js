const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const moment = require('moment');
require("moment-duration-format");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  const status = {
  online: 'Online',
  idle: 'Idle',
  dnd: 'Do Not Disturb',
  offline: 'Offline/Invisible'
};
const member = message.mentions.members.first() || message.member;
    if(!member.user) return message.channel.send("Couldn't find that user.");
    if(member.roles.size !=0);
    let icon = member.user.displayAvatarURL;
        let memberembed = new Discord.RichEmbed()
        .setDescription("User Information")
        .setColor("#5998ff")
        .setThumbnail(icon)
        .addField("Asked By", `${message.author.username}`, true)
        .addField("Username", member.user)
        .addField("Roles:", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`)
        .addField("Created On", `\`${moment.utc(member.user.createdAt).format("LTS")} (${ms(Date.now()- member.user.createdAt, {long: true})})\``, true)
        .addField("You joined", `\`${moment.utc(message.member.joinedAt).format("LTS")} (${ms(Date.now()- message.member.joinedAt, {long: true})})\``, true)
        .addField("Status", `${status[member.user.presence.status]}`, true)
        //.addField("Game", member.user.presence.game.name, true);
        message.channel.send(memberembed);
}

module.exports.help = {
    name: "memberinfo"
};