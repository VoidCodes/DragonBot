const Discord = require('discord.js');

// Command Handler
module.exports.run = async (bot, message, args) => {
    
    // Variables
    let servers = bot.guilds.size; // Server Count
    let users = 0; // Start of user count
    let channels = bot.channels.size; // Channel Count
    
    // This goes through every guild to grab an accurate memberCount;
    bot.guilds.map(g => users += g.memberCount);
    
    // Form Embed
    const embed = new Discord.RichEmbed()
        .setTitle('Community Channels')
        .setColor("RANDOM")
        .addField('Servers', servers, true)
        .addField('Users', users, true)
        .addField('Channels', channels, true);

    // Send Embed
    message.channel.send(embed);
    
}

module.exports.help = {
    name: "stats"
}