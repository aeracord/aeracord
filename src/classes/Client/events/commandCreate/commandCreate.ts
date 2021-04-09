import { Client, Command, CommandData, RawCommandCreateData } from "../../../../internal";

export default function commandCreate(client: Client, rawData: RawCommandCreateData) {

    // Parse command data
    const commandData: CommandData = Command._fromRawData(client, rawData, rawData.guild_id);

    // Emit event
    client.emit("commandCreate", commandData, {
        rawData,
        command: client.commands.get(commandData.id)
    });
}