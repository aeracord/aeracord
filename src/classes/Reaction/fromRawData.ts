import { Client, RawReactionData, Reaction } from "../../internal";

export default function fromRawData(client: Client, rawData: RawReactionData): Reaction {

    // Parse reaction
    const reaction: Reaction = new Reaction(client, {
        count: rawData.count,
        me: rawData.me,
        emoji: {
            id: rawData.emoji.id || undefined,
            name: rawData.emoji.name || undefined,
            animated: Boolean(rawData.emoji.animated)
        }
    });

    // Return
    return reaction;
}