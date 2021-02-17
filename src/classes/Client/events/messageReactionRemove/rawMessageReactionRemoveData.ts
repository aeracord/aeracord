import { RawReactionDataEmoji } from "../rawReactionData";

export interface RawMessageReactionRemoveData {
    message_id: string;
    channel_id: string;
    guild_id?: string;
    user_id: string;
    emoji: RawReactionDataEmoji;
}