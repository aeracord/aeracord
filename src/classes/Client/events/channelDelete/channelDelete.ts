import { AnyChannel, AnyChannelData, Channel, Client, RawChannelData } from "../../../../internal";

export default function channelDelete(client: Client, rawData: RawChannelData) {

    // Parse channel data
    const channelData: AnyChannelData = Channel._fromRawData(client, rawData);

    // Get channel
    const channel: AnyChannel | undefined = client.channels.get(channelData.id);

    // Mark as deleted
    if (channel) channel._markAsDeleted();

    // Emit event
    client.emit("channelDelete", channelData, {
        rawData,
        channel
    });
}