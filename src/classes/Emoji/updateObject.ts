import { Emoji, EmojiData } from "../../internal";

export default function updateObject(emoji: Emoji, emojiData: EmojiData) {

    // Set data
    emoji.name = emojiData.name;
    emoji.guildID = emojiData.guildID;
    emoji.animated = Boolean(emojiData.animated);
    emoji.managed = Boolean(emojiData.managed);
    emoji.available = Boolean(emojiData.available);
    emoji.creator = emojiData.creator;
    emoji.requiresColons = Boolean(emojiData.requiresColons);
    emoji.roles = emojiData.roles;
}