let Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
        // .setAuthor(message.author.username)
         .setDescription("This all the users info")
        // .setColor("red")
        // .addField("Full Username", message.author.username + "#" + message.author.discriminator)
        // .addField("ID", message.author.id)
        // .addField("Created At", message.author.createdAt)
        // .setThumbnail(message.author.displayAvatarURL);
        .setAuthor(message.author.username)
    .setColor('RANDOM')
    .setThumbnail(message.author.displayAvatarURL)

    .addField('Avatar', message.author.avatar, true)
    .addField('Bot', message.author.bot, true)
    .addField('Created At', message.author.createdAt, false)
    .addField('Discrim', message.author.discriminator, true)
    .addField('DMChannel', message.author.dmChannel)
    .addField('ID', message.author.id)
    .addField('Last Message', message.author.lastMessage)
    .addField('Last Message ID', message.author.lastMessageID)
    .addField('Presence', message.author.presence)
    .addField('Presence Status', message.author.presence.status)
    .addField('Presence Game', message.author.presence.game.name)
    .addField('Tag', message.author.tag)
    .addField('Username', message.author.username)
    .addField('Nick Name', message.guild.member(message.author).displayName)

    .setFooter('Requested By ' + message.author.tag)
    .setTimestamp();


    message.channel.send(embed);
}

module.exports.help = {
    name: "userinfo",
    
}