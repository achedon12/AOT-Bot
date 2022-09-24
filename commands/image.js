const namelist = require("../namelist");

module.exports.config = {
    name: "image",
    description: "obtenir l'image d'une personne",
    pushable: false
}

module.exports.network = {
    name: "image",
    description: "obtenir l'image d'une personne",
    options: [
        {
            name: "login",
            description: "Veuillez entrer un login",
            type: "STRING",
            required: true
        }
    ]
}

module.exports.execute = function (member, channel, guild, args, Client, interaction) {
    
    if(namelist.tab.includes(args[0])){
        interaction.reply(`https://intranet.iut-valence.fr/img/PhotosEtudiants/${namelist.tab[namelist.tab.indexOf(args[0])]}.jpg`);
    }else{
        interaction.reply("⛔ Ce login est invalide !");
    }
}