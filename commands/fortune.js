const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports.config = {
    name: "fortune",
    description: "envoie un message fortune",
    pushable: false,
}

module.exports.network = {
    name: "fortune",
    description: "envoie un message fortune",
}

module.exports.execute = async function (member, channel, guild, args, Client, interaction) {

    const response = await fetch("http://www.yerkee.com/api/fortune").json;
    console.log(response)
    //interaction.reply(response.fortune);
}