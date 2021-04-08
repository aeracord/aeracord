import { Reaction, ReactionData } from "../../internal";

export default function toData(reaction: Reaction): ReactionData {

    // Parse reaction data
    return {
        messageID: reaction.messageID,
        channelID: reaction.channelID,
        guildID: reaction.guildID,
        count: reaction.count,
        me: reaction.me,
        emoji: {
            id: reaction.emoji.id,
            name: reaction.emoji.name,
            animated: reaction.emoji.animated
        }
    };
}