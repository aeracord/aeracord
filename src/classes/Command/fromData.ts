import { Client, Command, CommandData } from "../../internal";

export default function fromData(client: Client, commandData: CommandData): Command {

    // Create command
    const command: Command = new Command(client, commandData);

    // Return
    return command;
}