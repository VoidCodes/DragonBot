const Discord = require('discord.js')

module.exports.run = (bot, message, args) => {

  var loremIpsum = require("lorem-ipsum")
, output     = loremIpsum()



  const loremIpsumEmb = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setAuthor('Here is your randomly generated lorem ipsum!', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXJhr8sCfuluVWVRscrya6AgVT-9IBpuvQgQgyn9OATL1MZpAV')
  .setTitle('```' + output + '```')
  
  message.channel.send({embed: loremIpsumEmb})
}

module.exports.help = {
    name: "loremipsum"
  }