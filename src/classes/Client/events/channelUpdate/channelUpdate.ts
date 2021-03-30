import { AnyChannelData, Channel, Client, RawChannelData } from "../../../../internal";

export default function channelUpdate(client: Client, rawData: RawChannelData) {

    // Parse channel data
    const channelData: AnyChannelData = Channel._fromRawData(client, rawData);

    // Emit event
    client.emit("channelUpdate", channelData, {
        rawData,
        channel: client.channels.get(channelData.id)
    });
}