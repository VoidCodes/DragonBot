const Discord = require('discord.js');

module.exports.run = (bot, message, args) => {
    if (message.author.id !== ('312914626184740864')) return message.channel.send("Huh.");
    const status = args.join(' ');
    if (status.length === 0) {
      const embed = new Discord.RichEmbed()
        .setColor("#7289DA")
        .setDescription(':negative_squared_cross_mark: Name streaming status!');
      message.channel.send({ embed });
    }
  
    else if (status.length !== 0) {
     bot.user.setPresence({ game: { name: `${status}`, url: 'https://twitch.tv/hellcat', type: 1 } });
    const embed = new Discord.RichEmbed()
      .setColor("#7289DA")
      .setDescription(':white_check_mark: You sucessfully changed streaming status');
    message.channel.send({ embed });
  }};

module.exports.help = {
    name: "setstreamstatus"
}
