import { Channel, ChannelData, Client, RawChannelData } from "../../../../internal";

export default function channelUpdate(client: Client, rawData: RawChannelData) {

    // Parse channel data
    const channelData: ChannelData = Channel._fromRawData(client, rawData) as ChannelData;

    // Emit event
    client.emit("channelUpdate", channelData, {
        rawData,
        channel: client.channels.get(channelData.id)
    });
}