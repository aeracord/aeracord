import { Client, Emoji, EmojiData } from "../../internal";

export default function fromData(client: Client, emojiData: EmojiData): Emoji {

    // Update cached emoji
    let emoji: Emoji | undefined = Emoji._updateObjectFromData(client, emojiData);

    // Create emoji
    if (!emoji) emoji = new Emoji(client, emojiData);

    // Return
    return emoji;
}