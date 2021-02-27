import { RawUserlessMemberData } from "../../internal";

export default interface RawUserData {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
    bot?: boolean;
    system?: boolean;
    flags?: number;
    public_flags?: number;
}

export interface RawUserWithMemberData extends RawUserData {
    member: RawUserlessMemberData;
}