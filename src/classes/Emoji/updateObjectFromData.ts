import { Client, Emoji, EmojiData } from "../../internal";

export default function updateObjectFromData(client: Client, emojiData: EmojiData) {

    // Get emoji from cache
    let emoji: Emoji | undefined = client.emojis.get(emojiData.id);

    // Update emoji object
    if (emoji) Emoji._updateObject(emoji, emojiData);
}