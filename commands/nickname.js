const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let nickname = args.join(' ')
    message.guild.members.get('414404860062990336')
        .setNickname(nickname);
    await message.channel.send({
        embed: new Discord.RichEmbed()
  
            .setTitle(`Changed Server Nickname to ${nickname}`)
    })
}

module.exports.help = {
    name: "nickname"
}