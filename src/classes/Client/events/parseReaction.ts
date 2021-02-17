import { Client, Reaction } from "../../../internal";
import { RawReactionData } from "./rawReactionData";

export default function parseReaction(client: Client, rawData: RawReactionData): Reaction {

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