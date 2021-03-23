import { Emoji, EmojiData } from "../../internal";

export default function updateObject(emoji: Emoji, emojiData: EmojiData) {

    // Set data
    emoji.name = emojiData.name;
    emoji.guildID = emojiData.guildID;
    emoji.animated = emojiData.animated;
    emoji.managed = emojiData.managed;
    emoji.available = emojiData.available;
    emoji.creator = emojiData.creator;
    emoji.requiresColons = emojiData.requiresColons;
    emoji.roles = emojiData.roles;
}