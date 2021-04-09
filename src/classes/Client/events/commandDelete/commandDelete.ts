import { Client, Command, CommandData, RawCommandDeleteData } from "../../../../internal";

export default function commandDelete(client: Client, rawData: RawCommandDeleteData) {

    // Parse command data
    const commandData: CommandData = Command._fromRawData(client, rawData, rawData.guild_id);

    // Get command
    const command: Command | undefined = client.commands.get(commandData.id);

    // Mark as deleted
    if (command) command._markAsDeleted();

    // Emit event
    client.emit("commandDelete", commandData, {
        rawData,
        command
    });
}