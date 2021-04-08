import { DefaultMessageNotifications, ExplicitContentFilter, GuildChannelType, PermissionType, RawUserData, VerificationLevel } from "../../internal";

export interface RawTemplateData {
    code: string;
    name: string;
    description: string | null;
    usage_count: number;
    creator_id: string;
    creator: RawUserData;
    created_at: string;
    updated_at: string;
    source_guild_id: string;
    serialized_source_guild: RawTemplateDataGuild;
    is_dirty: boolean | null;
}

export interface RawTemplateDataGuild {
    name: string;
    icon_hash: string | null;
    region: string;
    afk_channel_id: number | null;
    afk_timeout: number;
    verification_level: VerificationLevel;
    default_message_notifications: DefaultMessageNotifications;
    explicit_content_filter: ExplicitContentFilter;
    roles: RawTemplateDataGuildRole[];
    channels: RawTemplateDataGuildChannel[];
    system_channel_id: number | null;
    system_channel_flags: number;
    description: string | null;
    preferred_locale: string;
}

export interface RawTemplateDataGuildRole {
    id: number;
    name: string;
    color: number;
    hoist: boolean;
    permissions: string;
    mentionable: boolean;
}

export interface RawTemplateDataGuildChannel {
    id: number;
    type: GuildChannelType;
    name: string;
    topic: string | null;
    position: number;
    nsfw: boolean;
    permission_overwrites: RawTemplateDataGuildChannelPermissionOverwrite[];
    bitrate?: number;
    user_limit?: number;
    rate_limit_per_user?: number;
    parent_id: number | null;
}

export interface RawTemplateDataGuildChannelPermissionOverwrite {
    id: number;
    type: PermissionType;
    allow: string;
    deny: string;
}