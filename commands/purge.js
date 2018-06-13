const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("ADMINISTRATOR")) return errors.noPerms(message, "MANAGE_MESSAGES");
  if(!args[0]) return message.channel.send("O O F");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Deleted ${args[0]} messages.`).then(msg => msg.delete(5000)); 
  });

}

module.exports.help = {
  name: "purge"
}