import { RawUserlessMemberData } from "../../internal";

export interface RawUserData {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
    banner?: string | null;
    accent_color?: number | null;
    bot?: boolean;
    system?: boolean;
    flags?: number;
    public_flags?: number;
}

export interface RawUserWithMemberData extends RawUserData {
    member: RawUserlessMemberData;
}