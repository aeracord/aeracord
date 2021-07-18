import { ChannelType, PermissionType, RawUserData, VideoQualityMode } from "../../internal";

export interface RawChannelData {
    id: string;
    type: ChannelType;
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
    video_quality_mode?: VideoQualityMode;
    rate_limit_per_user?: number;
    parent_id: string | null;
    recipients?: RawUserData[];
    owner_id?: string;
    thread_metadata?: RawChannelDataThreadMetadata;
    member?: RawChannelDataThreadMember;
    message_count?: number;
    member_count?: number;
}

export interface RawChannelDataPermissionOverwrite {
    id: string;
    type: PermissionType;
    allow: string;
    deny: string;
}

export interface RawChannelDataThreadMetadata {
    archived: boolean;
    auto_archive_duration: number;
    archive_timestamp: string;
    locked?: boolean;
}

export interface RawChannelDataThreadMember {
    id?: string;
    user_id?: string;
    join_timestamp: string;
    flags: number;
}