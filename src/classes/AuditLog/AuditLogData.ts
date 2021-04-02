/**
 * Audit Log Data
 *
 * Represents an `AuditLog`
 */
export interface AuditLogData {

    /**
     * Guild ID
     *
     * The ID of the guild this audit log is in
     */
    guildID: string;

    /**
     * Entries
     *
     * The audit log's entries
     */
    entries: AuditLogEntry[];
}

/**
 * Audit Log Entry
 *
 * An audit log entry
 */
export interface AuditLogEntry {

    /**
     * ID
     *
     * The audit log entry's ID
     */
    id: string;

    /**
     * Event
     *
     * The audit log entry's event
     */
    event: AuditLogEvent;

    /**
     * Target ID
     *
     * The ID of the target object
     */
    targetID: string | null;

    /**
     * Actor ID
     *
     * The ID of the user that made the change
     */
    actorID: string;

    /**
     * Changes
     *
     * The audit log entry's changes
     */
    changes: AuditLogChange[] | null;

    /**
     * Options
     *
     * The audit log entry's options
     */
    options: AuditLogOptions | null;

    /**
     * Reason
     *
     * The audit log entry's reason
     */
    reason: string | null;
}

/**
 * Audit Log Event
 * https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events
 */
export type AuditLogEvent = typeof AUDIT_LOG_EVENT_GUILD_UPDATE | typeof AUDIT_LOG_EVENT_CHANNEL_CREATE | typeof AUDIT_LOG_EVENT_CHANNEL_UPDATE | typeof AUDIT_LOG_EVENT_CHANNEL_DELETE | typeof AUDIT_LOG_EVENT_CHANNEL_OVERWRITE_CREATE | typeof AUDIT_LOG_EVENT_CHANNEL_OVERWRITE_UPDATE | typeof AUDIT_LOG_EVENT_CHANNEL_OVERWRITE_DELETE | typeof AUDIT_LOG_EVENT_MEMBER_KICK | typeof AUDIT_LOG_EVENT_MEMBER_PRUNE | typeof AUDIT_LOG_EVENT_MEMBER_BAN_ADD | typeof AUDIT_LOG_EVENT_MEMBER_BAN_REMOVE | typeof AUDIT_LOG_EVENT_MEMBER_UPDATE | typeof AUDIT_LOG_EVENT_MEMBER_ROLE_UPDATE | typeof AUDIT_LOG_EVENT_MEMBER_MOVE | typeof AUDIT_LOG_EVENT_MEMBER_DISCONNECT | typeof AUDIT_LOG_EVENT_BOT_ADD | typeof AUDIT_LOG_EVENT_ROLE_CREATE | typeof AUDIT_LOG_EVENT_ROLE_UPDATE | typeof AUDIT_LOG_EVENT_ROLE_DELETE | typeof AUDIT_LOG_EVENT_INVITE_CREATE | typeof AUDIT_LOG_EVENT_INVITE_UPDATE | typeof AUDIT_LOG_EVENT_INVITE_DELETE | typeof AUDIT_LOG_EVENT_WEBHOOK_CREATE | typeof AUDIT_LOG_EVENT_WEBHOOK_UPDATE | typeof AUDIT_LOG_EVENT_WEBHOOK_DELETE | typeof AUDIT_LOG_EVENT_EMOJI_CREATE | typeof AUDIT_LOG_EVENT_EMOJI_UPDATE | typeof AUDIT_LOG_EVENT_EMOJI_DELETE | typeof AUDIT_LOG_EVENT_MESSAGE_DELETE | typeof AUDIT_LOG_EVENT_MESSAGE_BULK_DELETE | typeof AUDIT_LOG_EVENT_MESSAGE_PIN | typeof AUDIT_LOG_EVENT_MESSAGE_UNPIN | typeof AUDIT_LOG_EVENT_INTEGRATION_CREATE | typeof AUDIT_LOG_EVENT_INTEGRATION_UPDATE | typeof AUDIT_LOG_EVENT_INTEGRATION_DELETE;
export const AUDIT_LOG_EVENT_GUILD_UPDATE = 1;
export const AUDIT_LOG_EVENT_CHANNEL_CREATE = 10;
export const AUDIT_LOG_EVENT_CHANNEL_UPDATE = 11;
export const AUDIT_LOG_EVENT_CHANNEL_DELETE = 12;
export const AUDIT_LOG_EVENT_CHANNEL_OVERWRITE_CREATE = 13;
export const AUDIT_LOG_EVENT_CHANNEL_OVERWRITE_UPDATE = 14;
export const AUDIT_LOG_EVENT_CHANNEL_OVERWRITE_DELETE = 15;
export const AUDIT_LOG_EVENT_MEMBER_KICK = 20;
export const AUDIT_LOG_EVENT_MEMBER_PRUNE = 21;
export const AUDIT_LOG_EVENT_MEMBER_BAN_ADD = 22;
export const AUDIT_LOG_EVENT_MEMBER_BAN_REMOVE = 23;
export const AUDIT_LOG_EVENT_MEMBER_UPDATE = 24;
export const AUDIT_LOG_EVENT_MEMBER_ROLE_UPDATE = 25;
export const AUDIT_LOG_EVENT_MEMBER_MOVE = 26;
export const AUDIT_LOG_EVENT_MEMBER_DISCONNECT = 27;
export const AUDIT_LOG_EVENT_BOT_ADD = 28;
export const AUDIT_LOG_EVENT_ROLE_CREATE = 30;
export const AUDIT_LOG_EVENT_ROLE_UPDATE = 31;
export const AUDIT_LOG_EVENT_ROLE_DELETE = 32;
export const AUDIT_LOG_EVENT_INVITE_CREATE = 40;
export const AUDIT_LOG_EVENT_INVITE_UPDATE = 41;
export const AUDIT_LOG_EVENT_INVITE_DELETE = 42;
export const AUDIT_LOG_EVENT_WEBHOOK_CREATE = 50;
export const AUDIT_LOG_EVENT_WEBHOOK_UPDATE = 51;
export const AUDIT_LOG_EVENT_WEBHOOK_DELETE = 52;
export const AUDIT_LOG_EVENT_EMOJI_CREATE = 60;
export const AUDIT_LOG_EVENT_EMOJI_UPDATE = 61;
export const AUDIT_LOG_EVENT_EMOJI_DELETE = 62;
export const AUDIT_LOG_EVENT_MESSAGE_DELETE = 72;
export const AUDIT_LOG_EVENT_MESSAGE_BULK_DELETE = 73;
export const AUDIT_LOG_EVENT_MESSAGE_PIN = 74;
export const AUDIT_LOG_EVENT_MESSAGE_UNPIN = 75;
export const AUDIT_LOG_EVENT_INTEGRATION_CREATE = 80;
export const AUDIT_LOG_EVENT_INTEGRATION_UPDATE = 81;
export const AUDIT_LOG_EVENT_INTEGRATION_DELETE = 82;

/**
 * Audit Log Change
 *
 * An audit log change
 */
export interface AuditLogChange {

    /**
     * Type
     *
     * The audit log change's type
     */
    type: AuditLogChangeType;

    /**
     * Old Value
     *
     * The value before the change
     */
    oldValue: any;

    /**
     * New Value
     *
     * The value after the change
     */
    newValue: any;
}

/**
 * Audit Log Change Type
 * https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-key
 */
export type AuditLogChangeType = "name" | "description" | "icon" | "splash" | "discoverySplash" | "banner" | "ownerID" | "region" | "preferredLocale" | "afkChannelID" | "afkTimeout" | "rulesChannelID" | "publicUpdatesChannelID" | "mfaLevel" | "verificationLevel" | "explicitContentFilter" | "defaultMessageNotifications" | "vanityURLCode" | "add" | "remove" | "pruneDeleteDays" | "widgetEnabled" | "widgetChannelID" | "systemChannelID" | "position" | "topic" | "bitrate" | "permissionOverwrites" | "nsfw" | "applicationID" | "rateLimitPerUser" | "permissions" | "color" | "hoist" | "mentionable" | "allow" | "deny" | "code" | "channelID" | "inviterID" | "maxUses" | "uses" | "maxAge" | "temporary" | "deaf" | "mute" | "nick" | "avatar" | "id" | "type" | "enableEmoticons" | "expireBehavior" | "expireGracePeriod" | "userLimit";

/**
 * Audit Log Options
 *
 * An audit log entry's options
 */
export interface AuditLogOptions {

    /**
     * Delete Member Days
     *
     * The number of days after which members were pruned
     */
    deleteMemberDays: number | null;

    /**
     * Members Removed
     *
     * The amount of members that were pruned
     */
    membersRemoved: number | null;

    /**
     * Channel ID
     *
     * The ID of the channel
     */
    channelID: string | null;

    /**
     * Message ID
     *
     * The ID of the message
     */
    messageID: string | null;

    /**
     * Count
     *
     * The amount of items
     */
    count: number | null;

    /**
     * ID
     *
     * The channel overwrite's ID
     */
    id: string | null;

    /**
     * Type
     *
     * The channel overwrite's type
     */
    type: string | null;

    /**
     * Role Name
     *
     * The name of the role for the channel overwrite
     */
    roleName: string | null;
}