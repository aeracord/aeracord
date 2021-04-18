import { AnyChannel, AnyChannelData, Channel, Client, RawChannelData } from "../../../../internal";

export default function channelUpdate(client: Client, rawData: RawChannelData) {

    // Get old channel data
    const oldChannel: AnyChannel | undefined = client.channels.get(rawData.id);
    const oldChannelData: AnyChannelData | undefined = oldChannel && Channel.toData(oldChannel);

    // Parse channel
    const channel: AnyChannel = Channel._fromRawData(client, rawData);

    // Emit event
    client.emit("channelUpdate", channel, {
        rawData,
        oldChannelData
    });
}