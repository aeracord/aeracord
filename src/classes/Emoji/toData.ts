import { Emoji, EmojiData } from "../../internal";

export default function toData(emoji: Emoji): EmojiData {

    // Parse emoji data
    return {
        id: emoji.id,
        name: emoji.name,
        guildID: emoji.guildID,
        animated: emoji.animated,
        managed: emoji.managed,
        available: emoji.available,
        creator: emoji.creator,
        requiresColons: emoji.requiresColons,
        roles: emoji.roles
    };
}