const Discord = require('discord.js')

module.exports.run = (bot, message, args) => {

    let bicon = bot.user.displayAvatarURL
    let testembed = new Discord.RichEmbed()
    .setTitle('TEST')
    .setAuthor('rage', "https://i.imgur.com/lm8s41J.png")

    message.member.send(testembed);

}

module.exports.help = {
    name: 'test'
}
