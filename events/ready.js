const slashsCommands = require("../managers/slashsCommandsManager");

module.exports.execute = async function (args1,args2,args3,Client) {
    setTimeout(function () {
        slashsCommands.PushCommandInDiscord(Client);
        slashsCommands.PushCommandNotArgument(Client);
    }, 1000);

    console.log("bot allumé");
    Client.user.setActivity({
        name: "AIO",
        type: 3,
    });
}
