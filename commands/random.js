const Discord = require('discord.js'),
      Chance = require('chance'),
      random = new Chance(),
      parseArgs = require('minimist');

module.exports.run = (bot, message, args) => {

    const embed = new Discord.RichEmbed()
        .setColor(0xffffff)
    
    // Check if they typed 'list' / didn't mention an item
    if (!args[0] || args[0].toLowerCase() === 'list') {
        
        // Declare Variables
        let resp = Object.keys(Object.getPrototypeOf(random))
            
        // Remove First Item (Version)
        resp.shift();
        
        // Configure Embed
        embed.setDescription(resp.join(', '))
             .setTitle('List');
             
        // Return & Send Embed
        return message.channel.send(embed)
        
    }
    
    // Parse Options
    let item = args[0];
    args.shift();
    
    // Run minimist package
    let options = parseArgs(args);
    
    // Delete _ in options
    delete options['_'];

    // Parse Response
    let response;
    try {
        response = random[item.toLowerCase()](options);
    } catch (e) {
        response = `Sorry, I can't return a random ${item}`;
    }
    
    // Configure Embed
    if (typeof response === 'object') { // Parse Objects
        response = JSON.stringify(response, null, 4);
        embed.setDescription(`\`\`\`js\n${response}\`\`\``)
    } else { // Run if NOT an object
        embed.setFooter(response);   
    }

    // Send Embed
    message.channel.send(embed);

}

module.exports.help = {
    name: "random"
}