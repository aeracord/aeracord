import { Command, CommandData } from "../../internal";

export default function updateObject(command: Command, commandData: CommandData) {

    // If the `CommandData` was fetched before the `Command` object was last updated, dont update anything
    if (commandData.fetchedAt < command._lastUpdatedAt) return;

    // Unmark as deleted
    if (command.deleted) command._unmarkAsDeleted();

    // Set data
    command.id = commandData.id;
    command.guildID = commandData.guildID;
    command.applicationID = commandData.applicationID;
    command.name = commandData.name;
    command.type = commandData.type;
    command.description = commandData.description;
    command.options = commandData.options;
    command.defaultPermission = commandData.defaultPermission;
    command._lastUpdatedAt = Date.now();
}