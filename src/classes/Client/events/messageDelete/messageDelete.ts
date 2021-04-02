import { Client, Message, MessageDeleteData, RawMessageDeleteData } from "../../../../internal";

export default function messageDelete(client: Client, rawData: RawMessageDeleteData) {

    // Parse data
    const data: MessageDeleteData = {
        id: rawData.id,
        channelID: rawData.channel_id,
        guildID: rawData.guild_id || null
    };

    // Get message
    const message: Message | undefined = client.messages.get(data.id);

    // Mark as deleted
    if (message) message._markAsDeleted();

    // Emit event
    client.emit("messageDelete", data, {
        rawData,
        message,
        guild: data.guildID ? client.guilds.get(data.guildID) : undefined,
        channel: client.channels.get(data.channelID)
    });
}