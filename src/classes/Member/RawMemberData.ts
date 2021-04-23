import { RawUserData } from "../../internal";

export interface RawMemberData extends RawUserlessMemberData {
    user: RawUserData;
}

export interface RawUserlessMemberData {
    nick?: string | null;
    roles: string[];
    joined_at: string;
    premium_since?: string | null;
    pending?: boolean;
}