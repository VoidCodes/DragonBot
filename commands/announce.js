const Discord = require("discord.js");

module.exports.run = async (bot,message, args) => {
    //>announce [message here]
    if(message.member.roles.some(r=>["BaconBot", "BaconBot Owner", "Owner!!!!", "Co-Owner", "BaconBot dev"].includes(r.name))) {
        let announceembed = new Discord.RichEmbed()
        .setTitle("Announcement")
        .setDescription(args.join(" "))
        .setColor("#ff6a00")
        .setFooter(`Announced By ${message.author.username}`);

        let split = args.slice(1);
        let url = args[2]


        let everyone = message.guild.roles.find('name', "@everyone");
        let announceChannel = message.guild.channels.find(`name`, "announcements");
        if(!announceChannel) return message.channel.send("Couldn't find announce channel.");
        announceChannel.send(`${everyone}`, announceembed);
    }

}; 
 


module.exports.help = {
    name: "announce"
};