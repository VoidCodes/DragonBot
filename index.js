const botconfig = require("./botconfig.json");
const Discord = require('discord.js');
const tokenfile = require("./token.json");
const fs = require("fs");
const encode = require('strict-uri-encode');
const urban = require('relevant-urban');
const weather = require('weather-js')
const money = require('discord-money');
const profanities = require('profanities');
const translate = require('google-translate-api');
const sqlite3 = require('sqlite3')
const bot = new Discord.Client();
const send = require('quick.hook');
const moment = require("moment");
require("moment-duration-format");
bot.commands = new Discord.Collection();
let coins = require("./coins.json");
let xp = require("./xp.json");
let purple = botconfig.purple;
let cooldown = new Set();
let cdseconds = 10;

fs.readdir("./commands", (err, files) => {

 if(err) console.log(err);

 let jsfile = files.filter(f => f.split(".").pop() === "js")
 if(jsfile.length <= 0){
   console.log("Couldn't find commands");
   return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  }); 

});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("$help | v3.0 | watching bacons", {type: "PLAYING"});

});

bot.on("guildMemberAdd", function(member) {
  let role = member.guild.roles.find("name", "Fans");
  member.addRole(role).catch(console.error);
});

bot.on("guildMemberAdd", async member => {
  console.log(`${member.id} joined the server`);

  let welcomechannel = member.guild.channels.find('name', "welcome-leave");
  welcomechannel.send(`OMFG! ${member} has come to raid the server! JK`);
});

bot.on("guildMemberRemove", async member => {

  console.log(`${member.id} left the server`);

if (message.guild.channel.type != 'text') return;
  let welcomechannel = member.channel.channels.find(`name`, "welcome-leave");
  welcomechannel.send(`RIP MA NIGGA ${member} hope u return to the server`);

});

bot.on("roleUpdate", async (oldRole, newRole) => {
  
  let logchannel = oldRole.guild.channels.find(`name`, "created-changed-roles");
  logchannel.send(`The role ${oldRole.name} has changed to ${newRole}`);


});

bot.on("guildMemberUpdate", async (oldMember, newMember) => {

  let logchannel = newMember.guild.channels.find(`name`, "changed-updated-users");

  
  if(oldMember.displayName == newMember.displayName){
    return logchannel.send(`The user ${newMember} has been updated.`)
  }

  logchannel.send(`The user ${oldMember.displayName} has changed to ${newMember}`);

});
  


bot.on("roleDelete", async role => { 

  let logchannel = newRole.guild.channels.find('name', "deleted-roles");
  logchannel.send(`The role ${role.name} has been deleted.`);

});

bot.on('channelCreate', async channel => {

  console.log(`${channel.name} has been created.`);

if (channel.type != 'text') return;
  let sChannel = channel.guild.channels.find('name', 'created-channels');
  sChannel.send(`${channel} has been created`);

});

bot.on("channelDelete", async channel => {

  console.log(`${channel.name} has been deleted.`);

  let sChannel = channel.guild.channels.find(`name`, "deleted-channels");
  sChannel.send(`${channel.name} has been deleted`);

});


bot.on("message", async message => {
 if(message.author.bot) return;
 if(message.channel.type === "dm") return;

let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));

if(!prefixes[message.guild.id]){
  prefixes[message.guild.id] = {
    prefixes: botconfig.prefix
  };
}

if(!coins[message.author.id]){
  coins[message.author.id] = {
    coins: 0
  };
}

let coinAmt = Math.floor(Math.random() * 50) + 1;
let baseAmt = Math.floor(Math.random() * 50) + 1;
console.log(`${coinAmt} ; ${baseAmt}`);

if(coinAmt === baseAmt){
  coins[message.author.id] = {
    coins: coins[message.author.id].coins + coinAmt
  };
fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
  if (err) console.log(err)
});
let coinEmbed = new Discord.RichEmbed()
.setAuthor(message.author.username)
.setColor("#0000FF")
.addField(":money_with_wings:", `${coinAmt} coins added!`);

message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
}

let xpAdd = Math.floor(Math.random() * 7) + 8;
console.log(xpAdd);

if(!xp[message.author.id]){
  xp[message.author.id] = {
    xp: 0,
    level: 1
  };
}


let curxp = xp[message.author.id].xp;
let curlvl = xp[message.author.id].level;
let nxtLvl = xp[message.author.id].level * 300;
xp[message.author.id].xp =  curxp + xpAdd;
if(nxtLvl <= xp[message.author.id].xp){
  xp[message.author.id].level = curlvl + 1;
  let lvlup = new Discord.RichEmbed()
  .setTitle("Level up!")
  .setColor(purple)
  .addField("New Level", curlvl + 1);

  message.channel.send(lvlup).then(msg => {msg.delete(5000)});
}
fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
  if(err) console.log(err)
});
let prefix = prefixes[message.guild.id].prefixes;
if(!message.content.startsWith(prefix)) return;
if(cooldown.has(message.author.id)){
  message.delete();
  return message.reply("WAIT ANOTHER 10 SEC B4 USING A COMMAND THX!")
}
//if(!message.member.hasPermission("ADMINISTRATOR")){
  cooldown.add(message.author.id);
//}


 let messageArray = message.content.split(" ");
 let cmd = messageArray[0];
 let args = messageArray.slice(1);

 let commandfile = bot.commands.get(cmd.slice(prefix.length));
 if(commandfile) commandfile.run(bot, message, args);

setTimeout(() => {
  cooldown.delete(message.author.id)
}, cdseconds * 1000)

 });

bot.login(process.env.token);
