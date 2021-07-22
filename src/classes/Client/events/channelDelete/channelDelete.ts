import { AnyChannel, Channel, Client, RawChannelData } from "../../../../internal";

export default function channelDelete(client: Client, rawData: RawChannelData) {

    // Parse channel
    const channel: AnyChannel = Channel._fromRawData(client, rawData);

    // Mark as deleted
    if (channel) channel._markAsDeleted();

    // Remove from guild channels
    if ("guildID" in channel) {
        const guildChannels: string[] | undefined = client._guildChannels.get(channel.guildID);
        if ((guildChannels) && (guildChannels.includes(channel.id))) guildChannels.splice(guildChannels.indexOf(channel.id), 1);
    }

    // Remove from channel permissions
    client._channelPermissions.delete(channel.id);

    // Emit event
    client.emit("channelDelete", channel, {
        rawData
    });
}