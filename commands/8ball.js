const Discord = require("discord.js");

module.exports.run = async (bot, message,args) => {

  //!8ball <question ok>
  if(!args[2]) return message.reply("Please ask properly THX!");
  let replies = ["Yes.", "No.", "IDK", "Ask later", "UR MOM GAY", "UR DAD LESBIAN", "NO U", "JEF"];

  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(1).join(" ");

  let ballembed = new Discord.RichEmbed()
  .setAuthor(message.author.tag)
  .setColor("#FF9900")
  .addField("Question", question)
  .addField("Answer", replies[result]);

   message.channel.send(ballembed);



}

module.exports.help = {
  name: "8ball"
}
