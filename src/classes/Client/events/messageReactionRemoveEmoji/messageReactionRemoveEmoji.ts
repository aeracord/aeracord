import { Client } from "../../../../internal";
import { MessageReactionRemoveEmojiData } from "./messageReactionRemoveEmojiData";
import { RawMessageReactionRemoveEmojiData } from "./rawMessageReactionRemoveEmojiData";

export default function messageReactionRemoveEmoji(client: Client, rawData: RawMessageReactionRemoveEmojiData) {

    // Parse data
    const data: MessageReactionRemoveEmojiData = {
        messageID: rawData.message_id,
        channelID: rawData.channel_id,
        guildID: rawData.guild_id,
        emoji: {
            id: rawData.emoji.id || undefined,
            name: rawData.emoji.name || undefined,
            animated: Boolean(rawData.emoji.animated)
        }
    };

    // Emit event
    client.emit("messageReactionRemoveEmoji", data, rawData);
}