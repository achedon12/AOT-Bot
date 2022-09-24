const {CommandInteraction} = require("discord.js");
const slashsCommandsManager = require("../managers/slashsCommandsManager");

module.exports.execute = async function (interaction, any1, any2, Client) {
    /**
     * @param {CommandInteraction} interaction
     */
    if (interaction.isChatInputCommand() || interaction.isContextMenuCommand() || interaction.isMessageContextMenuCommand()) {
        let args = [];
        if(interaction.options._group !== null) args[args.length] = interaction.options._group
        if(interaction.options._subcommand !== null) args[args.length] = interaction.options._subcommand

        await slashsCommandsManager.executeCommand(interaction.member, interaction.channel, interaction.guild, args, interaction.commandName, Client, interaction)
    }
}