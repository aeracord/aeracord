import { AnyChannel, AnyChannelData, Channel, Client, RawChannelData } from "../../../../internal";

export default function channelDelete(client: Client, rawData: RawChannelData) {

    // Parse channel data
    const channelData: AnyChannelData = Channel._fromRawData(client, rawData);

    // Get channel
    const channel: AnyChannel | undefined = client.channels.get(channelData.id);

    // Mark as deleted
    if (channel) channel._markAsDeleted();

    // Remove from guild channels
    if ((client._guildChannels) && ("guildID" in channelData)) {
        const guildChannels: string[] | undefined = client._guildChannels.get(channelData.guildID);
        if ((guildChannels) && (guildChannels.includes(channelData.id))) guildChannels.splice(guildChannels.indexOf(channelData.id), 1);
    }

    // Remove from channel permissions
    if (client._channelPermissions) client._channelPermissions.delete(channelData.id);

    // Emit event
    client.emit("channelDelete", channelData, {
        rawData,
        channel
    });
}