import { EmojiResolvable } from "../../internal";

export default function resolveID(emojiResolvable: EmojiResolvable): string | undefined {

    // Emoji
    if ((typeof emojiResolvable === "object") && ("id" in emojiResolvable)) return emojiResolvable.id;

    // Emoji ID
    else if (typeof emojiResolvable === "string") return emojiResolvable;
}