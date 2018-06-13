const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf-8"));

module.exports.run = async (bot, message, args) => {

  //!warn @daeshan <reason>
  if(args[0] == "help"){
    message.reply("Usage: $warn <user> <reason>");
    return;
  }
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("No can do pal!");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!wUser) return message.reply("Couldn't find them yo");
  if(wUser.hasPermission("ADMINISTRATOR")) return message.reply("They waaaay too kewl");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Warns")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("Warned User", `<@${wUser.id}>`)
  .addField("Warned In", message.channel)
  .addField("Number of Warnings", warns[wUser.id].warns)
  .addField("Reason", reason);

  let warnschannel = message.guild.channels.find(`name`, "warns");
  if(!warnschannel) return message.reply("Couldn't find channel");

  warnschannel.send(warnEmbed);

  if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(`name`, "muted");
    if(!muterole) return message.reply("You should create that role dude.");
    let mutetime = "10s";

    try{
      await wUser.send(`You have been muted for ${reason}. The mute will be up in ${mutetime}`);
    }catch(e){
      message.channel.send(`<@${wUser.id}> has their DMs locked. But they have been muted for ${reason}`);
    }

    
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> has been temporarily muted`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> has been unmuted.`);
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 3){

    try{
      await wUser.send(`You have been banned for ${reason}. Appeals can be made by DMing @baconhair`);
    }catch(e){
      message.channel.send(`<@${wUser.id}> has their DMs locked. But they have been banned for ${reason}`);
    }


    message.guild.member(wUser).ban(reason);
    message.reply(`<@${wUser.id}> has been banned.`)
  }

}

module.exports.help = {
  name: "warn"
}
