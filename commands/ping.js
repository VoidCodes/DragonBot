const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
 message.channel.send('Pong!').then((message) => {
    message.edit(`Pong! Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
});
}

module.exports.help = {
    name: "ping"
};