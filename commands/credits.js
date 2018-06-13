const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
let bicon = bot.user.displayAvatarURL;
let creditsembed = new Discord.RichEmbed()
.setColor("#59f442")
.setThumbnail(bicon)
.addField("Credits", "To the people who guided me in making my bot!")
.addField("Cassieboy", "he helped me to fix some errors of my bot and hosting my bot, thanks for help")
.addField("C4Navar", "He also helped me with some of my commands,thanks for help")
.addField("Youtube help","I also had help with my bots by following tutorials on YouTube. thanks to {TheSourceCode}, Evie.Codes, AnIdiotsGuide and PlexiDevelopment for helping me")
.addField("Discord help", "The people of discord helped me to fix all my errors of my bot")
.setFooter("Thanks to all this people that helped and contributed and made my bot ran")

message.member.send(creditsembed);
}

module.exports.help = {
    name: "credits"
  }