const { prefix } = require("../config.json");

const { DMChannel } = require("discord.js");

module.exports.execute = async function (message,args2,args3,Client){
    if(message.author.bot) return;
    if(message.channel instanceof DMChannel) return;

}