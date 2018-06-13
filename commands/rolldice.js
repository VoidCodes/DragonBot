const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let replies = ["1", "2", "3", "4", "5", "6", "Error Occured"];

  let result = Math.floor((Math.random() * replies.length));

  let ballembed = new Discord.RichEmbed()
  .setAuthor(message.author.tag)
  .setColor("#000000")
  .addField("Answer", replies[result]);

  message.channel.send(ballembed);
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

module.exports.help = {
    name: "rolldice",
    category: "Miscelaneous",
    description: "Role the dice and get a number",
    usage: "rolldice"
}

