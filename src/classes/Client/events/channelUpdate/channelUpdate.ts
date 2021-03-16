import { Channel, ChannelData, Client, RawChannelData } from "../../../../internal";

export default function channelUpdate(client: Client, rawData: RawChannelData) {

    // Parse channel data
    const channelData: ChannelData = Channel._fromRawData(rawData) as ChannelData;

    // Emit event
    client.emit("channelUpdate", channelData, rawData);
}