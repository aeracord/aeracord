import { RawThreadMemberData } from "../../../../internal";

export interface RawThreadMembersUpdateData {
    id: string;
    guild_id: string;
    member_count: number;
    added_members?: RawThreadMemberData[];
    removed_member_ids?: string[];
}