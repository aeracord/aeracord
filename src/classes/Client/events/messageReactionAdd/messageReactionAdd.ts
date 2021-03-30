import { Client, Member, Message, ReactionData } from "../../../../internal";
import { MessageReactionAddData } from "./messageReactionAddData";
import { RawMessageReactionAddData } from "./rawMessageReactionAddData";

export default function messageReactionAdd(client: Client, rawData: RawMessageReactionAddData) {

    // Parse data
    const data: MessageReactionAddData = {
        messageID: rawData.message_id,
        channelID: rawData.channel_id,
        guildID: rawData.guild_id || null,
        userID: rawData.user_id,
        member: (rawData.member && rawData.guild_id) ? Member._fromRawData(client, rawData.member, rawData.guild_id) : null,
        emoji: {
            id: rawData.emoji.id,
            name: rawData.emoji.name,
            animated: Boolean(rawData.emoji.animated)
        }
    };

    // Get message
    const message: Message | undefined = client.messages.get(data.messageID);

    // Add to reactions
    if (message) {

        // Get reaction
        const reaction: ReactionData | undefined = message.reactions.find((r: ReactionData) => r.emoji.id === data.emoji.id && r.emoji.name === data.emoji.name);

        // Update reaction
        if (reaction) {
            reaction.count++;
            if (data.userID === client.id) reaction.me = true;
        }

        // Add to reactions
        else message.reactions.push({
            messageID: message.id,
            channelID: message.channelID,
            guildID: message.guildID,
            count: 1,
            me: data.userID === client.id,
            emoji: data.emoji
        });
    }

    // Emit event
    client.emit("messageReactionAdd", data, {
        rawData,
        message,
        guild: data.guildID ? client.guilds.get(data.guildID) : undefined,
        channel: client.channels.get(data.channelID),
        user: client.users.get(data.userID)
    });
}