import { EmojiResolvable } from "../../internal";
import isID from "../../util/isID";

export default function resolveID(emojiResolvable: EmojiResolvable): string | undefined {

    // Emoji
    if ((typeof emojiResolvable === "object") && ("id" in emojiResolvable)) return emojiResolvable.id;

    // Emoji ID
    else if (isID(emojiResolvable)) return emojiResolvable;
}