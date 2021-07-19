import { Channel, Client, RawChannelData, ThreadChannel } from "../../../../internal";

export default function threadCreate(client: Client, rawData: RawChannelData) {

    // Parse thread
    const thread: ThreadChannel = Channel._fromRawData(client, rawData) as ThreadChannel;

    // Cache thread permissions
    ThreadChannel._cacheThreadPermissions(client, thread);

    // Emit event
    client.emit("threadCreate", thread, {
        rawData
    });
}