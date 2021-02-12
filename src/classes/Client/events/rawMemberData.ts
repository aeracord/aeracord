import { RawUserData } from "./rawUserData";

export interface RawMemberData extends RawUserlessMemberData {
    user: RawUserData;
}

export interface RawUserlessMemberData {
    nick?: string | null;
    roles: string[];
    mute: boolean;
    deaf: boolean;
    joined_at: string;
    premium_since?: string | null;
    pending?: boolean;
}