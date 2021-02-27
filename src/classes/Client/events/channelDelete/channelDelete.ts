import { AnyGuildChannel, Channel, Client, RawChannelData } from "../../../../internal";

export default function channelDelete(client: Client, rawData: RawChannelData) {

    // Parse channel
    const channel: AnyGuildChannel = Channel._fromRawData(client, rawData) as AnyGuildChannel;

    // Emit event
    client.emit("channelDelete", channel, rawData);
}