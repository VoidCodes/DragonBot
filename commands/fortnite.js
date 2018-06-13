const Discord = require("discord.js");
const fortnite = require("fortnite")
const ft = new fortnite('41dba687-7b76-4ccd-a63e-fb5a8c760cde');

module.exports.run = async (bot, message, args) => {

    let username = args[0];
    let platform = args[1] || "pc";

    ft.user(username, platform).then(data =>{
        var data1 = JSON.stringify(data.stats.lifetime)
        var NewData = JSON.parse(data1);
        console.log(NewData);
        
        let kills = NewData[10]['Kills'];
        console.log(kills);
        let wins = NewData[8]['Wins'];
        let kd = NewData[11]['K/d'];
        let mPlayer = NewData[7]['Matches Played'];
        let score = NewData[6]['Score'];

        let embed = new Discord.RichEmbed()
        .setTitle("Fortnite Stats")
        .setAuthor(data.username)
        .setColor(0xf940ed)
        .addField("Kills", kills)
        .addField("Wins", wins)
        .addField("Matches Played", mPlayer)
        .addField("KD", kd)
        .addField("Score", score)
        message.channel.send(embed);

    }).catch(e => {
        console.log(e);
        message.channel.send("Cant find username in database");
    });

}

module.exports.help = {
    name: "fortnite"
  }