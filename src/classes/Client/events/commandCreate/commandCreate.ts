import { Client, Command, RawCommandCreateData } from "../../../../internal";

export default function commandCreate(client: Client, rawData: RawCommandCreateData) {

    // Parse command data
    const command: Command = Command._fromRawData(client, rawData, rawData.guild_id);

    // Emit event
    client.emit("commandCreate", command, {
        rawData
    });
}