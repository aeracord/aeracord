import { Client, Message } from "../../../../internal";
import { MessageDeleteData } from "./messageDeleteData";
import { RawMessageDeleteData } from "./rawMessageDeleteData";

export default function messageDelete(client: Client, rawData: RawMessageDeleteData) {

    // Parse data
    const data: MessageDeleteData = {
        id: rawData.id,
        channelID: rawData.channel_id,
        guildID: rawData.guild_id || null
    };

    // Get message
    const message: Message | undefined = client.messages.get(data.id);

    // Remove from cache
    if (message) message.uncache();

    // Emit event
    client.emit("messageDelete", data, {
        rawData,
        message,
        guild: data.guildID ? client.guilds.get(data.guildID) : undefined,
        channel: client.channels.get(data.channelID)
    });
}