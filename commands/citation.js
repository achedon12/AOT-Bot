const Index = require("../index");
const fs = require("fs");

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
            required: true
        }
    ]
}



module.exports.execute = function (member, channel, guild, args, Client, interaction) {

    const cii = JSON.parse(fs.readFileSync(`${Index.dirname}/citations.json`));

    if(Index.profs.includes(args[0].toLowerCase())){
        let citations;
        for (let i = 0; i < cii.length; i++) {
            if(cii[i].name === args[0]){
                citations = cii[i].citations;
            }
        }
        if(citations.length !== 0){
            interaction.reply(citations[Math.floor(Math.random() * citations.length)]);
        }else{
            interaction.reply("⛔ Aucune citations pour ce prof !");
        }
    }else{
        interaction.reply("⛔ Ce prof est invalide !");
    }
}