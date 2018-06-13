const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(message.author.id !== "312914626184740864") return;
  try {
    var code = args.join(" ");
    var evaled = eval(code);

    if (typeof evaled!== "string")
      evaled = require("util").inspect(evaled);

    message.channel.sendCode("xl", clean(evaled));
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
  }
}

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
}

module.exports.help = {
    name: "eval"
 }