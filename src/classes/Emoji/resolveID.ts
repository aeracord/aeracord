import { Emoji, EmojiResolvable } from "../../internal";
import isID from "../../util/isID";

export default function resolveID(emojiResolvable: EmojiResolvable): string | undefined {

    // Emoji
    if (emojiResolvable instanceof Emoji) return emojiResolvable.id;

    // Emoji ID
    else if (isID(emojiResolvable)) return emojiResolvable;
}