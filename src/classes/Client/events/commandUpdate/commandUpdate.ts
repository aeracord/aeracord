import { Client, Command, CommandData, RawCommandUpdateData } from "../../../../internal";

export default function commandUpdate(client: Client, rawData: RawCommandUpdateData) {

    // Get old command data
    const oldCommand: Command | undefined = client.commands.get(rawData.id);
    const oldCommandData: CommandData | undefined = oldCommand && Command.toData(oldCommand);

    // Parse command data
    const commandData: CommandData = Command._fromRawData(client, rawData, rawData.guild_id);

    // Emit event
    client.emit("commandUpdate", commandData, {
        rawData,
        command: client.commands.get(commandData.id),
        oldCommandData
    });
}