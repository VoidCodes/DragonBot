const Discord = require('discord.js');

module.exports.run = (bot, message, args) => {
  if (message.author.id !== ('312914626184740864')) return message.channel.send("Huh.");
  const status = args.join(' ');
  if (status.length === 0) {
    const embed = new Discord.RichEmbed()
      .setColor("#7289DA")
      .setDescription('<:deny:434077006200700948> Name watching status!');
    message.channel.send({ embed });
  }

  else if (status.length !== 0) {
  bot.user.setActivity(`${status}`, {  type: "WATCHING"});
  const embed = new Discord.RichEmbed()
    .setColor("#7289DA")
    .setDescription('<:approve:434076978367299584> You sucessfully changed watching status');
  message.channel.send({ embed });
}};

module.exports.help = {
    name: "setwatch"
}