import { Client, Command, CommandData } from "../../internal";

export default function fromData(client: Client, commandData: CommandData): Command {

    // Update cached command
    let command: Command | undefined = Command._updateObjectFromData(client, commandData);

    // Create command
    if (!command) command = new Command(client, commandData);

    // Return
    return command;
}