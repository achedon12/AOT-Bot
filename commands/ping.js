module.exports.config = {
    name: "ping",
    description: "savoir le ping de quelqu'un",
    pushable: false,
}

module.exports.network = {
    name: "ping",
    description: "savoir le ping de quelqu'un",
    options: [
        {
            name: "membre",
            description: "pseudo",
            type: "USER",
            required: false
        }
    ]
}

module.exports.execute = function (member, channel, guild, args, Client, interaction) {
    interaction.reply(`🏓 Votre ping est de ${Math.abs(Date.now() - interaction.createdTimestamp)} ms\n`);
}