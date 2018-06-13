const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    if (message.member.voiceChannel) {
        message.channel.send('Now you will feel the experience of Julio...')
        const connection = await message.member.voiceChannel.join();
        const voiceChannel = message.member.voiceChannel;
        const dispatcher = connection.playStream(`https://cdn.glitch.com/9d994d94-1e04-4865-be3c-8ba1be48b172%2Fihatemyson_-_Makin'_My_Way_Downtown_with_Julio_(OFFICIAL_MUSIC_VIDEO).mp3`);
        dispatcher.on('end', () => voiceChannel.leave());
    } else {
        message.reply('You need to join a voice channel first!');
    }
}

module.exports.help = {
    name: "julio"
  }