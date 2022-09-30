const {resource} = require("../config.json");
const link = `https://intranet.iut-valence.fr/ICS_ADE/${resource}.ics`;
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { EmbedBuilder } = require("discord.js");


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

    let tab = [];

    const result = await fetch(link);
    let testcalendar = (await result.text()).split('\n');
    let i = 0;
    while (i !== testcalendar.length) {
        if (testcalendar[i].includes("BEGIN:VEVENT")) {
            i = i + 2; // Skip useless ics data
            let templist = []; // Empty the temp array
            while ((testcalendar[i].includes("END:VEVENT")) === false) { // As long as the event isn't finished
                if (testcalendar[i].includes("DTSTART:") || testcalendar[i].includes("DTEND:") || testcalendar[i].includes("SUMMARY:") || testcalendar[i].includes("LOCATION:") || testcalendar[i].includes("DESCRIPTION:")) {
                    templist.push(testcalendar[i]); // Add the event details to the temp array
                    i++
                } else i++;
            }
            tab.push(templist); // When the event is finished, add the temparray to the main array
        }
        i++;
    }
    tab.sort();
    const date = new Date();

    let todayDate = `${date.getUTCDay().toString().padStart(2, '0') + 1}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${date.getUTCFullYear()}`;

    let day = 0;
    let event = 0;
    let searchevent = 0;
    let previouselement = tab[0][0].slice(8, 16)
    let tab3d = [[]];

    tab.forEach(element => {
        if (element[0].slice(8, 16) === previouselement) {
            let startdate = `${tab[searchevent][0].slice(8, 12)}-${tab[searchevent][0].slice(12, 14)}-${tab[searchevent][0].slice(14, 19)}:${tab[searchevent][0].slice(19, 21)}:${tab[searchevent][0].slice(21, 24)}`
            let dateStartDate = new Date(startdate)
            let enddate = `${tab[searchevent][1].slice(6, 10)}-${tab[searchevent][1].slice(10, 12)}-${tab[searchevent][1].slice(12, 17)}:${tab[searchevent][1].slice(17, 19)}:${tab[searchevent][1].slice(19, 22)}`
            let dateEndDate = new Date(enddate)

            tab3d[day][event] = {}
            tab3d[day][event].start = dateStartDate
            tab3d[day][event].end = dateEndDate
            tab3d[day][event].summary = tab[searchevent][2].slice(8, 200)
            tab3d[day][event].location = tab[searchevent][3].slice(9, 100)
            tab3d[day][event].description = tab[searchevent][4].slice(19, 200)
            event++;
            searchevent++;
        }
        else {
            day++;
            tab3d.push([]);
            event = 0;
            previouselement = element[0].slice(8, 16)

            let startdate = `${tab[searchevent][0].slice(8, 12)}-${tab[searchevent][0].slice(12, 14)}-${tab[searchevent][0].slice(14, 19)}:${tab[searchevent][0].slice(19, 21)}:${tab[searchevent][0].slice(21, 24)}`
            let dateStartDate = new Date(startdate)
            let enddate = `${tab[searchevent][1].slice(6, 10)}-${tab[searchevent][1].slice(10, 12)}-${tab[searchevent][1].slice(12, 17)}:${tab[searchevent][1].slice(17, 19)}:${tab[searchevent][1].slice(19, 22)}`
            let dateEndDate = new Date(enddate)

            tab3d[day][event] = {}
            tab3d[day][event].start = dateStartDate
            tab3d[day][event].end = dateEndDate
            tab3d[day][event].summary = tab[searchevent][2].slice(8, 200)
            tab3d[day][event].location = tab[searchevent][3].slice(9, 13)
            tab3d[day][event].description = tab[searchevent][4].slice(19, 200)
            event++;
            searchevent++;
        }
    });

    let fields = [];

    tab3d[0].forEach(element => {
        fields.push({name: element.summary+" - "+element.location, value: element.start.getHours()+":"+element.start.getMinutes().toString().padStart(2,'0')+" - "+element.end.getHours()+":"+element.end.getMinutes().toString().padStart(2,'0')})
    });
    interaction.reply(`Voici l'emploi du temps du ${todayDate}`)
    const embed = new EmbedBuilder()
        .setColor("#f825fc")
        .addFields(fields)

    channel.send({embeds: [embed]});


}