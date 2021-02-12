import { RawMemberData } from "../rawMemberData";

export interface RawTypingStartData {
    guild_id?: string;
    channel_id: string;
    user_id: string;
    timestamp: number;
    member?: RawMemberData;
}