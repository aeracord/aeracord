import { AnyChannelData, Channel, Client, RawChannelData } from "../../../../internal";

export default function channelCreate(client: Client, rawData: RawChannelData) {

    // Parse channel data
    const channelData: AnyChannelData = Channel._fromRawData(client, rawData);

    // Emit event
    client.emit("channelCreate", channelData, {
        rawData,
        channel: client.channels.get(channelData.id)
    });
}