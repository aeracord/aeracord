import { Emoji, EmojiResolvable } from "../../internal";

export default function resolveID(emojiResolvable: EmojiResolvable): string {

    // Emoji
    if (emojiResolvable instanceof Emoji) return emojiResolvable.id;

    // Emoji ID
    else return emojiResolvable;
}