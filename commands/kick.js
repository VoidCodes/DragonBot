const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

   if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "KICK_MEMBERS");
   if(args[0] == "help"){
     message.reply("Usage: $kick <user> <reason>");
     return;
   }
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!kUser) return errors.cantfindUser(message.channel);
      let kReason = args.slice(1).join(" ");
      if(kUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, kUser, "MANAGE_MESSAGES");
      
      let kickEmbed = new Discord.RichEmbed()
      .setDescription("~kick~")
      .setColor("#25ddc8")
      .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
      .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Kicked In", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", kReason);
    
      let kickChannel = message.guild.channels.find(`name`, "kick-logs");
      if(!kickChannel) return message.channel.send("Cant find kick-logs channel")
    
      message.guild.member(kUser).kick(kReason);
      kickChannel.send(kickEmbed);
}

module.exports.help = {
   name:"kick" 
}