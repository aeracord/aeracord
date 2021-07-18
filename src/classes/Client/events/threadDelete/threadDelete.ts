import { Client, RawThreadDeleteData, ThreadChannel, ThreadDeleteData } from "../../../../internal";

export default function threadDelete(client: Client, rawData: RawThreadDeleteData) {

    // Parse data
    const data: ThreadDeleteData = {
        id: rawData.id,
        type: rawData.type,
        guildID: rawData.guild_id,
        parentID: rawData.parent_id
    };

    // Get thread channel
    const thread: ThreadChannel | undefined = client.threads.get(data.id) as ThreadChannel | undefined;

    // Mark as deleted
    if (thread) thread._markAsDeleted();

    // Emit event
    client.emit("threadDelete", data, {
        rawData,
        thread,
        guild: client.guilds.get(data.guildID)
    });
}