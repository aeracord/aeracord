import { AuditLogEvent, RawUserData, RawWebhookData } from "../../internal";

export interface RawAuditLogData {
    audit_log_entries: RawAuditLogDataEntry[];
    users: RawUserData[];
    webhooks: RawWebhookData[];
    integrations: RawAuditLogDataIntegration[];
}

export interface RawAuditLogDataEntry {
    id: string;
    action_type: AuditLogEvent;
    target_id: string | null;
    user_id: string;
    changes?: RawAuditLogDataEntryChange[];
    options?: RawAuditLogDataEntryOptions;
    reason?: string;
}

export interface RawAuditLogDataEntryChange {
    key: RawAuditLogDataEntryChangeKey;
    old_value?: any;
    new_value?: any;
}

export type RawAuditLogDataEntryChangeKey = "name" | "description" | "icon_hash" | "splash_hash" | "discovery_splash_hash" | "banner_hash" | "owner_id" | "region" | "preferred_locale" | "afk_channel_id" | "afk_timeout" | "rules_channel_id" | "public_updates_channel_id" | "mfa_level" | "verification_level" | "explicit_content_filter" | "default_message_notifications" | "vanity_url_code" | "$add" | "$remove" | "prune_delete_days" | "widget_enabled" | "widget_channel_id" | "system_channel_id" | "position" | "topic" | "bitrate" | "permission_overwrites" | "nsfw" | "application_id" | "rate_limit_per_user" | "permissions" | "color" | "hoist" | "mentionable" | "allow" | "deny" | "code" | "channel_id" | "inviter_id" | "max_uses" | "uses" | "max_age" | "temporary" | "deaf" | "mute" | "nick" | "avatar_hash" | "id" | "type" | "enable_emoticons" | "expire_behavior" | "expire_grace_period" | "user_limit";

export interface RawAuditLogDataEntryOptions {
    delete_member_days?: string;
    members_removed?: string;
    channel_id?: string;
    message_id?: string;
    count?: string;
    id?: string;
    type?: string;
    role_name?: string;
}

export interface RawAuditLogDataIntegration {
    id: string;
    name: string;
    type: string;
    account: RawAuditLogDataIntegrationAccount;
}

export interface RawAuditLogDataIntegrationAccount {
    id: string;
    name: string;
}