const { resource } = require("../config.json");
const link = `https://intranet.iut-valence.fr/ICS_ADE/${resource}.ics`;
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports.config = {
    name: "edt",
    description: "envoie l'emploi du temps du jour",
    pushable: false
}

module.exports.network = {
    name: "edt",
    description: "envoie l'emploi du temps du jour",
}

module.exports.execute = async function (member, channel, guild, args, Client, interaction) {

    fetch(link)
    .then((value => {
        console.log(value);
    }));

}