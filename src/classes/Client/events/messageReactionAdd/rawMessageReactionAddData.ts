import { RawMemberData } from "../rawMemberData";
import { RawReactionDataEmoji } from "../rawReactionData";

export interface RawMessageReactionAddData {
    message_id: string;
    channel_id: string;
    guild_id?: string;
    user_id: string;
    member?: RawMemberData;
    emoji: RawReactionDataEmoji;
}