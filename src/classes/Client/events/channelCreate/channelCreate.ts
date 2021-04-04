import { AnyChannelData, Channel, Client, RawChannelData } from "../../../../internal";

export default function channelCreate(client: Client, rawData: RawChannelData) {

    // Parse channel data
    const channelData: AnyChannelData = Channel._fromRawData(client, rawData);

    // Add to guild channels
    if ((client._guildChannels) && ("guildID" in channelData)) {
        const guildChannels: string[] | undefined = client._guildChannels.get(channelData.guildID);
        if (guildChannels) guildChannels.push(channelData.id);
    }

    // Emit event
    client.emit("channelCreate", channelData, {
        rawData,
        channel: client.channels.get(channelData.id)
    });
}