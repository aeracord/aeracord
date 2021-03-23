import { RawReactionData, RawReactionMetadata, ReactionData } from "../../internal";

export default function fromRawData(rawData: RawReactionData, metadata: RawReactionMetadata): ReactionData {

    // Parse reaction data
    return {
        messageID: metadata.messageID,
        channelID: metadata.channelID,
        guildID: metadata.guildID,
        count: rawData.count,
        me: rawData.me,
        emoji: {
            id: rawData.emoji.id,
            name: rawData.emoji.name,
            animated: Boolean(rawData.emoji.animated)
        }
    };
}