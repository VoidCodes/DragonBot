const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    if (message.member.voiceChannel) {
        message.channel.send('Fine, I guess I will start breathing for you with my friends, you creep.')
        const connection = await message.member.voiceChannel.join();
        const voiceChannel = message.member.voiceChannel;
        const dispatcher = connection.playStream(`https://www.youtube.com/watch?v=35V6Sy0Ki3M`);
        dispatcher.on('end', () => voiceChannel.leave());
    } else {
        message.reply('Join a voice channel, you creep.');
    }
}

module.exports.help = {
    name: "loli"
  }