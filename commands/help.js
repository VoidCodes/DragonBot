const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let helpembed = new Discord.RichEmbed()
  .setDescription("Help Menu")
  .setColor("#120afc")
  .addField("Member Commands", "8ball, botinfo, coins, cat, credits, daily, dog, help, level, pay, ping, say, serverinfo, and report")
  .addField("8ball", "Usage:$8ball [question]")
  .addField("botinfo", "Usage:$botinfo")
  .addField("coins", "Usage:$coins")
  .addField("cat", "Usage:$cat")
  .addField("credits", "Usage:$credits")
  .addField("daily", "Usage:$daily")
  .addField("dog", "Usage:$dog")
  .addField("help", "Usage:$help")
  .addField("level", "Usage:$level")
  .addField("lmgtfy", "Usage: $lmgtfy [what u want to search]")
  .addField("pay", "Usage:$pay [@user]")
  .addField("pages", "Usage: $pages")
  .addField("ping", "Usage:$ping")
  .addField("report", "Usage:$report [@user]")
  .addField("say", "Usage:$say [message here]")
  .addField("serverinfo", "Usage:$serverinfo")
  .addField("shorten", "Usage: $shorten [URL here]")
  .addField("urban", "Usage: $urban [word here]")
  .addField("weather", "Usage:$weather [loaction]");

  message.member.send(helpembed);

  if(message.member.hasPermission("ADMINISTRATOR")){
  let modembed = new Discord.RichEmbed()
  .setDescription("Mod Help Menu")
  .setColor("#8b3aad")
  .addField("Mod Commands", "addrole, removerole, kick, warn, tempmute, warnlevel, ban, purge, prefix and announce")
  .addField("addrole", "Usage:$addrole [@user]")
  .addField("removerole", "Usage:$removerole [@user]")
  .addField("kick", "Usage:$kick [@user]")
  .addField("warn", "Usage:$warn [@user]")
  .addField("tempmute", "Usage:$tempmute [@user] [duration] [reason]")
  .addField("warnlevel", "Usage:$warnlevel [@user]")
  .addField("ban", "Usage:$ban [@user] [reason]")
  .addField("purge", "Usage:$purge [no. of msgs u want to clear]")
  .addField("announce", "Usage:$announce [message here]")
  .addField("prefix", "Usage:$prefix [new prefix here]");

  try{
    await message.author.send(modembed);
    message.react("😉")
  }catch(e){
    message.reply("Your DMs are locked. I cannot send you the mod cmds.")
  }
}

}

module.exports.help = {
  name: "help"
}

