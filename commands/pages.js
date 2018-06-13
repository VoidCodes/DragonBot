const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    let pages = ['1st Page!', '2nd Page!', '3rd Page!', '__Getting Bored!__', '**Too Bad then**', 'k']
    let page = 1;

    const embed = new Discord.RichEmbed()
      .setColor(0xff0a0a)
      .setFooter(`Page ${page} of ${pages.length}`)
      .setDescription(pages[page-1])

      message.channel.send(embed).then(msg =>{
          
        msg.react('⬅').then( r => {
          msg.react('➡')  

          const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id
          const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id

          const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 });

          const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });

          backwards.on('collect', r => {
            if (page === 1) return;
            page--;
            embed.setDescription(pages[page-1]);
            embed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(embed)
          })

          forwards.on('collect', r => {
            if (page === pages.length) return;
            page++;
            embed.setDescription(pages[page-1]);
            embed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(embed)
          })

        })

      })

}

module.exports.help = {
    name:"pages" 
 }