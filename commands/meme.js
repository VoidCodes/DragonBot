const Discord = require("discord.js")
const meme = require('memejs');

module.exports.run = async (bot, message, args) => {
    meme(function(data) {
        const embed = new Discord.RichEmbed()
        .setTitle(data.title[0])
        .setColor("RANDOM")
        .setImage(data.url[0])
        message.channel.send({embed});
        })};
       
module.exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ["meme", "memezzzzz"],
        permLevel: "User"
};

module.exports.help = {
    name: "meme",
    category: "Miscelaneous",
    description: "Memezzzz 4 life",
    usage: "meme"
  };
  
