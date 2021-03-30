import { Client, Message, ReactionData } from "../../../../internal";
import { MessageReactionRemoveEmojiData } from "./messageReactionRemoveEmojiData";
import { RawMessageReactionRemoveEmojiData } from "./rawMessageReactionRemoveEmojiData";

export default function messageReactionRemoveEmoji(client: Client, rawData: RawMessageReactionRemoveEmojiData) {

    // Parse data
    const data: MessageReactionRemoveEmojiData = {
        messageID: rawData.message_id,
        channelID: rawData.channel_id,
        guildID: rawData.guild_id || null,
        emoji: {
            id: rawData.emoji.id,
            name: rawData.emoji.name,
            animated: Boolean(rawData.emoji.animated)
        }
    };

    // Get message
    const message: Message | undefined = client.messages.get(data.messageID);

    // Remove from reactions
    if (message) {

        // Get reaction index
        const reactionIndex: number = message.reactions.findIndex((r: ReactionData) => r.emoji.id === data.emoji.id && r.emoji.name === data.emoji.name);

        // Remove reaction
        if (reactionIndex !== -1) message.reactions.splice(reactionIndex, 1);
    }

    // Emit event
    client.emit("messageReactionRemoveEmoji", data, {
        rawData,
        message,
        guild: data.guildID ? client.guilds.get(data.guildID) : undefined,
        channel: client.channels.get(data.channelID)
    });
}