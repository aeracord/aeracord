import { TargetUserType } from "../../../../internal";
import { RawUserData } from "../rawUserData";

export interface RawInviteCreateData {
    code: string;
    channel_id: string;
    guild_id: string;
    created_at: string;
    inviter?: RawUserData;
    max_age: number;
    max_uses: number;
    temporary: boolean;
    uses: number;
    target_user?: RawInviteCreateDataTargetUser;
    target_user_type?: TargetUserType;
}

export interface RawInviteCreateDataTargetUser {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
}