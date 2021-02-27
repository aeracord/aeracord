import { RawMemberData, RawReactionDataEmoji } from "../../../../internal";

export interface RawMessageReactionAddData {
    message_id: string;
    channel_id: string;
    guild_id?: string;
    user_id: string;
    member?: RawMemberData;
    emoji: RawReactionDataEmoji;
}