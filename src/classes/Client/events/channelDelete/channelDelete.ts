import { Channel, ChannelData, Client, RawChannelData } from "../../../../internal";

export default function channelDelete(client: Client, rawData: RawChannelData) {

    // Parse channel data
    const channelData: ChannelData = Channel._fromRawData(rawData) as ChannelData;

    // Emit event
    client.emit("channelDelete", channelData, {
        rawData,
        channel: client.channels.get(channelData.id)
    });
}