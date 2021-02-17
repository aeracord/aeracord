import { Client } from "../../../../internal";
import { MessageReactionRemoveData } from "./messageReactionRemoveData";
import { RawMessageReactionRemoveData } from "./rawMessageReactionRemoveData";

export default function messageReactionRemove(client: Client, rawData: RawMessageReactionRemoveData) {

    // Parse data
    const data: MessageReactionRemoveData = {
        messageID: rawData.message_id,
        channelID: rawData.channel_id,
        guildID: rawData.guild_id,
        userID: rawData.user_id,
        emoji: {
            id: rawData.emoji.id || undefined,
            name: rawData.emoji.name || undefined,
            animated: Boolean(rawData.emoji.animated)
        }
    };

    // Emit event
    client.emit("messageReactionRemove", data, rawData);
}