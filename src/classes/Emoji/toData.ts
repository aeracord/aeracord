import { Emoji, EmojiData, User } from "../../internal";

export default function toData(emoji: Emoji): EmojiData {

    // Parse emoji data
    return {
        id: emoji.id,
        name: emoji.name,
        guildID: emoji.guildID,
        animated: emoji.animated,
        managed: emoji.managed,
        available: emoji.available,
        creator: emoji.creator && User.toData(emoji.creator),
        requiresColons: emoji.requiresColons,
        roles: emoji.roles,
        fetchedAt: emoji._lastUpdatedAt
    };
}