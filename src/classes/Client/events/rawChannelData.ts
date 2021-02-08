import { PermissionType, PremiumType } from "../../../internal";

export interface RawChannelData {
    id: string;
    type: RawChannelDataType;
    name?: string;
    guild_id?: string;
    topic: string | null;
    position?: number;
    nsfw?: boolean;
    last_message_id: string | null;
    last_pin_timestamp: string | null;
    permission_overwrites?: RawChannelDataPermissionOverwrite[];
    bitrate?: number;
    user_limit?: number;
    rate_limit_per_user?: number;
    parent_id: string | null;
    recipients?: RawChannelDataUser[];
}

export type RawChannelDataType = typeof CHANNEL_TYPE_TEXT | typeof CHANNEL_TYPE_DM | typeof CHANNEL_TYPE_VOICE | typeof CHANNEL_TYPE_CATEGORY | typeof CHANNEL_TYPE_NEWS | typeof CHANNEL_TYPE_STORE;
export const CHANNEL_TYPE_TEXT = 0;
export const CHANNEL_TYPE_DM = 1;
export const CHANNEL_TYPE_VOICE = 2;
export const CHANNEL_TYPE_CATEGORY = 4;
export const CHANNEL_TYPE_NEWS = 5;
export const CHANNEL_TYPE_STORE = 6;

export interface RawChannelDataPermissionOverwrite {
    id: string;
    type: PermissionType;
    allow: string;
    deny: string;
}

export interface RawChannelDataUser {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
    bot?: boolean;
    system?: boolean;
    mfa_enabled?: boolean;
    locale?: boolean;
    flags?: number;
    premium_type?: PremiumType;
}