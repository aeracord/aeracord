import { AnyChannel, Channel, Client, RawChannelData } from "../../../../internal";

export default function channelCreate(client: Client, rawData: RawChannelData) {

    // Parse channel
    const channel: AnyChannel = Channel._fromRawData(client, rawData);

    // Add to guild channels
    if ("guildID" in channel) {
        const guildChannels: string[] | undefined = client._guildChannels.get(channel.guildID);
        if (guildChannels) guildChannels.push(channel.id);
    }

    // Emit event
    client.emit("channelCreate", channel, {
        rawData
    });
}