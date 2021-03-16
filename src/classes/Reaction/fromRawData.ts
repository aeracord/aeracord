import { RawReactionData, ReactionData } from "../../internal";

export default function fromRawData(rawData: RawReactionData): ReactionData {

    // Parse reaction data
    return {
        count: rawData.count,
        me: rawData.me,
        emoji: {
            id: rawData.emoji.id || undefined,
            name: rawData.emoji.name || undefined,
            animated: Boolean(rawData.emoji.animated)
        }
    };
}