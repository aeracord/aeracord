import { Client, Command, RawCommandDeleteData } from "../../../../internal";

export default function commandDelete(client: Client, rawData: RawCommandDeleteData) {

    // Parse command data
    const command: Command = Command._fromRawData(client, rawData, rawData.guild_id);

    // Mark as deleted
    command._markAsDeleted();

    // Emit event
    client.emit("commandDelete", command, {
        rawData
    });
}