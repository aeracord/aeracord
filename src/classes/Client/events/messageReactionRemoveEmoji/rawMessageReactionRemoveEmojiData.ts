import { RawReactionDataEmoji } from "../../../../internal";

export interface RawMessageReactionRemoveEmojiData {
    message_id: string;
    channel_id: string;
    guild_id?: string;
    emoji: RawReactionDataEmoji;
}