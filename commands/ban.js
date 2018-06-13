const Discord = require("discord.js");
const errors = require("../utils/errors.js")

module.exports.run = async (bot, message, args) => {
  message.delete();
  if(!message.member.hasPermission("BAN_MEMBERS")) return  errors.noPerms(message, "BAN_MEMBERS");
   if(args[0] == "help"){
     message.reply("Usage: $ban <user> <reason>");
     return;
   }
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return errors.cantfindUser(message.channel);
    if(bUser.id === bot.user.id) return errors.botuser(message);
    let bReason = args.join(" ").slice(22);
    if(!bReason) return errors.noReason(message.channel);
    if(bUser.hasPermission("ADMINISTRATOR")) return errors.equalPerms(message, buser, "ADMINISTRATOR");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let banschannel = message.guild.channels.find(`name`, "bans");
    if(!banschannel) return message.channel.send("Can't find bans channel.");

    message.guild.member(bUser).ban(bReason);
    banschannel.send(banEmbed);
}

module.exports.help = {
  name:"ban"
}