import { ReactionEmojiResolvable } from "../../internal";

export default function resolveString(reactionEmojiResolvable: ReactionEmojiResolvable): string | undefined {

    // Reaction
    if ((typeof reactionEmojiResolvable === "object") && ("emoji" in reactionEmojiResolvable)) return reactionEmojiResolvable.emoji.id ? `${reactionEmojiResolvable.emoji.name}:${reactionEmojiResolvable.emoji.id}` : (reactionEmojiResolvable.emoji.name as string);

    // Emoji
    else if ((typeof reactionEmojiResolvable === "object") && ("id" in reactionEmojiResolvable)) return `${reactionEmojiResolvable.name}:${reactionEmojiResolvable.id}`;

    // Emoji string
    else if (typeof reactionEmojiResolvable === "string") return reactionEmojiResolvable;
}