import { Client, Emoji, EmojiData } from "../../internal";

export default function fromData(client: Client, emojiData: EmojiData): Emoji {

    // Get emoji from cache
    let emoji: Emoji | undefined = client.emojis.get(emojiData.id);

    // Create emoji
    if (!emoji) emoji = new Emoji(client, emojiData);

    // Return
    return emoji;
}