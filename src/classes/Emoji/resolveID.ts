import { Emoji, EmojiResolvable } from "../../internal";

export default function resolveID(emojiResolvable: EmojiResolvable): string | undefined {

    // Emoji
    if (emojiResolvable instanceof Emoji) return emojiResolvable.id;

    // Emoji ID
    else if (/^[0-9]{17,}$/.test(emojiResolvable)) return emojiResolvable;
}