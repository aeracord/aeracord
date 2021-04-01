import { Client, Message, MessageReactionRemoveData, RawMessageReactionRemoveData, ReactionData } from "../../../../internal";

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

    // Get message
    const message: Message | undefined = client.messages.get(data.messageID);

    // Remove from reactions
    if (message) {

        // Get reaction
        const reaction: ReactionData | undefined = message.reactions.find((r: ReactionData) => r.emoji.id === data.emoji.id && r.emoji.name === data.emoji.name);
        if (reaction) {

            // Update reaction
            reaction.count--;
            if (data.userID === client.id) reaction.me = false;

            // Remove reaction
            if (reaction.count === 0) message.reactions.splice(message.reactions.indexOf(reaction), 1);
        }
    }

    // Emit event
    client.emit("messageReactionRemove", data, {
        rawData,
        message,
        guild: data.guildID ? client.guilds.get(data.guildID) : undefined,
        channel: client.channels.get(data.channelID),
        user: client.users.get(data.userID)
    });
}