const Index = require("../index");
const fs = require("fs");
const {EmbedBuilder} = require("discord.js");

module.exports.config = {
    name: "citation",
    description: "obtenir la citation d'un prof",
    pushable: false
}

module.exports.network = {
    name: "citation",
    description: "obtenir la citation d'un prof",
    options: [
        {
            name: "nom",
            description: "nom du prof",
            type: "STRING",
            required: false
        }
    ]
}

module.exports.execute = function (member, channel, guild, args, Client, interaction) {

    const cii = JSON.parse(fs.readFileSync(`${Index.dirname}/citations.json`));
    let citations = [];
    if(args[0] === undefined){
        let url;
        let name;
        let object = cii[Math.floor(Math.random() * cii.length)];

        for (let j = 0; j < object.citations.length; j++) {
            citations.push(object.citations[j])
            url = object.url;
            name = object.name;
        }

        interaction.reply(`${citations.length} citations de ${name}`)
        let rand = Math.floor(Math.random() * citations.length);
        const embed = new EmbedBuilder()
            .setColor("#f825fc")
            .setTitle(`${citations[rand].text} - ${citations[rand].date}`)
            .setImage(url)
            .setDescription("Citation de :")
        channel.send({embeds: [embed]});
    }else{
        if(Index.profs.includes(args[0].toLowerCase())){
            let url;
            let object;
            for (let i = 0; i < cii.length; i++) {
                if(cii[i].name === args[0]){
                    object = cii[i];
                }
            }

            for (let j = 0; j < object.citations.length; j++) {
                citations.push(object.citations[j])
                url = object.url;

            }

            if(citations.length !== 0){
                interaction.reply(`${citations.length} citations de ${args[0]}`)
                let rand = Math.floor(Math.random() * citations.length);
                const embed = new EmbedBuilder()
                    .setColor("#f825fc")
                    .setTitle(`${citations[rand].text} - ${citations[rand].date}`)
                    .setImage(url)
                    .setDescription("Citation de :")
                channel.send({embeds: [embed]});
            }else{
                interaction.reply("⛔ Aucune citations pour cette personne !");
            }
        }else{
            interaction.reply("⛔ Cette personne est invalide !");
        }
    }

}