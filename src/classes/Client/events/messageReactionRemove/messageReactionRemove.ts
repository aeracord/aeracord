import { Client } from "../../../../internal";
import { MessageReactionRemoveData } from "./messageReactionRemoveData";
import { RawMessageReactionRemoveData } from "./rawMessageReactionRemoveData";

export default function messageReactionRemove(client: Client, rawData: RawMessageReactionRemoveData) {

    // Parse data
    const data: MessageReactionRemoveData = {
        messageID: rawData.message_id,
        channelID: rawData.channel_id,
        guildID: rawData.guild_id || null,
        userID: rawData.user_id,
        emoji: {
            id: rawData.emoji.id,
            name: rawData.emoji.name,
            animated: Boolean(rawData.emoji.animated)
        }
    };

    // Emit event
    client.emit("messageReactionRemove", data, {
        rawData,
        message: client.messages.get(data.messageID),
        guild: data.guildID ? client.guilds.get(data.guildID) : undefined,
        channel: client.channels.get(data.channelID),
        user: client.users.get(data.userID)
    });
}