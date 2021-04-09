import { Client, Command, CommandData } from "../../internal";

export default function updateObjectFromData(client: Client, commandData: CommandData): Command | undefined {

    // Get command from cache
    let command: Command | undefined = client.commands.get(commandData.id);

    // Update command object
    if (command) Command._updateObject(command, commandData);

    // Return
    return command;
}