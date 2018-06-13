const Discord = require("discord.js");
const shorten = require('isgd');

module.exports.run = async (bot, message, args) => {
    if (!args[0]) return message.channel.send('**Proper usage: $shorten <URL> [title]**')

    if (!args[1]) {

      shorten.shorten(args[0], function(res) {
          if (res.startsWith('Error:')) return message.channel.send('**Please enter a valid URL***');

          message.channel.send(`**<${res}>**`)

      })

    } else {

        shorten.custom(args[0], args[1], function(res) {

           if (res.startsWith('Error:')) message.channel.send(`**${res}**`);

           message.channel.send(`**<${res}>**`);

        })

    }

}

module.exports.help = {
    name:"shorten" 
 }