const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let user = message.mentions.users.first() || message.author;

    let embed = new Discord.RichEmbed()
    
    .setAuthor(`${user.username}`)
    .setImage(user.displayAvatarURL)
    .setColor('RANDOM')

    message.channel.send(embed)

}

module.exports.help = {
    name: "avatar"
  }