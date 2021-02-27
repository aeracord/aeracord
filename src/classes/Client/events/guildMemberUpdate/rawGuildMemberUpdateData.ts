import { RawUserData } from "../../../../internal";

export interface RawGuildMemberUpdateData {
    guild_id: string;
    nick?: string | null;
    roles: string[];
    joined_at: string;
    premium_since?: string | null;
    pending?: boolean;
    user: RawUserData;
}