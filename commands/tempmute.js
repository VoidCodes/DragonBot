const Discord = require("discord.js");
const ms = require("ms");
const botconfig = require("../botconfig.json");
const red = botconfig.red;
const green = botconfig.green;
const orange = botconfig.orange;

module.exports.run = async (bot, message, args) => {

 //!tempmute @user 1s/m/h/d reason


 if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("No can do");
 if(args[0] == "help"){
  message.reply("Usage: $tempmute <user> <1s/m/h/d>");
  return;
}
 let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
 if(!tomute) return message.reply("Couldn't find user.");
 if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Cant't mute them!");

 let reason = args.slice(2).join(" ");
 if(!reason) message.reply("Please provide a reason.")
 console.log.reason

 let muterole = message.guild.roles.find(`name`, "muted");
 //start of create role
 if(!muterole){
   try{
     muterole = await message.guild.createRole({
       name: 'muted',
       color: "#000000",
       permissions:[]
     })
     message.guild.channels.forEach(async (channel, id) => {
       await channel.overwritePermissions(muterole, {
         SEND_MESSAGES: false,
         ADD_REACTIONS: false
       });
     });
   }catch(e){
      console.log(e.stack);
   }
 }
 //end of create role
 let mutetime = args[1];
 if(!mutetime) return message.reply("You didnt specify a time!");

 message.delete().catch(O_o=>{});

try{
  await tomute.send(`HEY! You've been muted for ${mutetime}, O O F!`)
}catch(e){
   message.channel.send(`A user has been muted... but their DMs are locked. They will be muted for ${mutetime}`)
}

let muteembed = new Discord.RichEmbed()
.setDescription(`Mute executed by ${message.author}`)
.setColor(orange)
.addField("Muted User", tomute)
.addField("Muted in", message.channel)
.addField("Time", message.createdAt)
.addField("Length", mutetime)
.addField("Reason", reason);

let mutelogschannel = message.guild.channels.find(`name`, "mute-logs");
if(!mutelogschannel) return message.reply("Pls create mutelogs channel first!");
mutelogschannel.send(muteembed);

await(tomute.addRole(muterole.id));

setTimeout(function(){
  tomute.removeRole(muterole.id);
  message.channel.send(`<@${tomute.id}> has been unmuted!`);
}, ms(mutetime));


//end of module
}

module.exports.help = {
   name: "tempmute"
}