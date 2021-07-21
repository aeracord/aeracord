import { RawChannelData, RawThreadMemberData } from "../../../../internal";

export interface RawThreadListSyncData {
    guild_id: string;
    channel_ids?: string[];
    threads: RawChannelData[];
    members: RawThreadMemberData[];
}