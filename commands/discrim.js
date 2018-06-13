const Discord = require('discord.js');

module.exports.run = (bot, message, args) => {
    
    // Form Embed
    const embed = new Discord.RichEmbed()
        .setColor(0xffffff);
    
    // Check if they entered a number between 0-10000
    if (isNaN(args[0]) || args[0] > 9999 || args[0] < 1) { // Run if out of parameters
        
        // Update embed footer
        embed.setFooter('Sorry, please enter a valid discrim.');
        
        // Send error message
        return message.channel.send(embed);
        
    }
    
   // Initialize response string
   let resp = '';
   
   // Go through each user connected to the bot
   bot.users.map(function(user) {
       
       // The if statement will check if the input is equal to the user's discrim
       if (user.discriminator == args[0]) return resp += `${user.username}\n`;
       else return; // If not, return
       
   })
   
    // Add embed options
    embed.setTitle(`Discrim: ${args[0]}`)
        .setDescription(resp);
        
    // Send Embed
    message.channel.send(embed)
    
}

module.exports.help = {
    name: "discrim"
}