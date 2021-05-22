import { RawUserData, TargetType } from "../../../../internal";

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
    target_type?: TargetType;
    target_user?: RawInviteCreateDataTargetUser;
}

export interface RawInviteCreateDataTargetUser {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
}