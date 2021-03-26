import { Channel, ChannelData, Client, RawChannelData } from "../../../../internal";

export default function channelCreate(client: Client, rawData: RawChannelData) {

    // Parse channel data
    const channelData: ChannelData = Channel._fromRawData(client, rawData) as ChannelData;

    // Emit event
    client.emit("channelCreate", channelData, {
        rawData,
        channel: client.channels.get(channelData.id)
    });
}