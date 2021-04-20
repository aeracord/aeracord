import { Emoji, EmojiData } from "../../internal";

export default function updateObject(emoji: Emoji, emojiData: EmojiData) {

    // If the `EmojiData` was fetched before the `Emoji` object was last updated, dont update anything
    if (emojiData.fetchedAt < emoji._lastUpdatedAt) return;

    // Unmark as deleted
    if (emoji.deleted) emoji._unmarkAsDeleted();

    // Set data
    emoji.name = emojiData.name;
    emoji.guildID = emojiData.guildID;
    emoji.animated = emojiData.animated;
    emoji.managed = emojiData.managed;
    emoji.available = emojiData.available;
    emoji.creator = emojiData.creator;
    emoji.requiresColons = emojiData.requiresColons;
    emoji.roles = emojiData.roles;
    emoji._lastUpdatedAt = Date.now();
}