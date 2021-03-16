import { Client, Emoji, EmojiData } from "../../internal";

export default function fromRawData(client: Client, emojiData: EmojiData): Emoji {

    // Create emoji
    const emoji: Emoji = new Emoji(client, emojiData);

    // Return
    return emoji;
}