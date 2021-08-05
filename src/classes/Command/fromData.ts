import { Client, Command, CommandData } from "../../internal";

export default function fromData(client: Client, commandData: CommandData): Command {

    // Get command from cache
    let command: Command | undefined = client.commands.get(commandData.id);

    // Create command
    if (!command) command = new Command(client, commandData);

    // Return
    return command;
}