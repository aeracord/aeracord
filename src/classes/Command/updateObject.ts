import { Command, CommandData } from "../../internal";

export default function updateObject(command: Command, commandData: CommandData) {

    // Unmark as deleted
    if (command.deleted) command._unmarkAsDeleted();

    // Set data
    command.id = commandData.id;
    command.guildID = commandData.guildID;
    command.applicationID = commandData.applicationID;
    command.name = commandData.name;
    command.description = commandData.description;
    command.options = commandData.options;
}