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
    actorID: string | null;

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
export type AuditLogEvent = typeof AuditLogEvents.GUILD_UPDATE | typeof AuditLogEvents.CHANNEL_CREATE | typeof AuditLogEvents.CHANNEL_UPDATE | typeof AuditLogEvents.CHANNEL_DELETE | typeof AuditLogEvents.CHANNEL_OVERWRITE_CREATE | typeof AuditLogEvents.CHANNEL_OVERWRITE_UPDATE | typeof AuditLogEvents.CHANNEL_OVERWRITE_DELETE | typeof AuditLogEvents.MEMBER_KICK | typeof AuditLogEvents.MEMBER_PRUNE | typeof AuditLogEvents.MEMBER_BAN_ADD | typeof AuditLogEvents.MEMBER_BAN_REMOVE | typeof AuditLogEvents.MEMBER_UPDATE | typeof AuditLogEvents.MEMBER_ROLE_UPDATE | typeof AuditLogEvents.MEMBER_MOVE | typeof AuditLogEvents.MEMBER_DISCONNECT | typeof AuditLogEvents.BOT_ADD | typeof AuditLogEvents.ROLE_CREATE | typeof AuditLogEvents.ROLE_UPDATE | typeof AuditLogEvents.ROLE_DELETE | typeof AuditLogEvents.INVITE_CREATE | typeof AuditLogEvents.INVITE_UPDATE | typeof AuditLogEvents.INVITE_DELETE | typeof AuditLogEvents.WEBHOOK_CREATE | typeof AuditLogEvents.WEBHOOK_UPDATE | typeof AuditLogEvents.WEBHOOK_DELETE | typeof AuditLogEvents.EMOJI_CREATE | typeof AuditLogEvents.EMOJI_UPDATE | typeof AuditLogEvents.EMOJI_DELETE | typeof AuditLogEvents.MESSAGE_DELETE | typeof AuditLogEvents.MESSAGE_BULK_DELETE | typeof AuditLogEvents.MESSAGE_PIN | typeof AuditLogEvents.MESSAGE_UNPIN | typeof AuditLogEvents.INTEGRATION_CREATE | typeof AuditLogEvents.INTEGRATION_UPDATE | typeof AuditLogEvents.INTEGRATION_DELETE;
export const AuditLogEvents: {

    /**
     * Guild Update
     *
     * When a guild is updated
     */
    GUILD_UPDATE: 1,

    /**
     * Channel Create
     *
     * When a channel is created
     */
    CHANNEL_CREATE: 10,

    /**
     * Channel Update
     *
     * When a channel is updated
     */
    CHANNEL_UPDATE: 11,

    /**
     * Channel Delete
     *
     * When a channel is deleted
     */
    CHANNEL_DELETE: 12,

    /**
     * Channel Overwrite Create
     *
     * When a channel overwrite is created
     */
    CHANNEL_OVERWRITE_CREATE: 13,

    /**
     * Channel Overwrite Update
     *
     * When a channel overwrite is updated
     */
    CHANNEL_OVERWRITE_UPDATE: 14,

    /**
     * Channel Overwrite Delete
     *
     * When a channel overwrite is deleted
     */
    CHANNEL_OVERWRITE_DELETE: 15,

    /**
     * Member Kick
     *
     * When a member is kicked from a guild
     */
    MEMBER_KICK: 20,

    /**
     * Member Prune
     *
     * When members are pruned from a guild
     */
    MEMBER_PRUNE: 21,

    /**
     * Member Ban Add
     *
     * When a user is banned from a guild
     */
    MEMBER_BAN_ADD: 22,

    /**
     * Member Ban Remove
     *
     * When a user is unbanned from a guild
     */
    MEMBER_BAN_REMOVE: 23,

    /**
     * Member Update
     *
     * When a member is updated
     */
    MEMBER_UPDATE: 24,

    /**
     * Member Role Update
     *
     * When a member's roles are updated
     */
    MEMBER_ROLE_UPDATE: 25,

    /**
     * Member Move
     *
     * When a member is moved to a different voice channel
     */
    MEMBER_MOVE: 26,

    /**
     * Member Disconnect
     *
     * When a mmeber is disconnected from a voice channel
     */
    MEMBER_DISCONNECT: 27,

    /**
     * Bot Add
     *
     * When a bot is added to a guild
     */
    BOT_ADD: 28,

    /**
     * Role Create
     *
     * When a role is created
     */
    ROLE_CREATE: 30,

    /**
     * Role Update
     *
     * When a role is updated
     */
    ROLE_UPDATE: 31,

    /**
     * Role Delete
     *
     * When a role is deleted
     */
    ROLE_DELETE: 32,

    /**
     * Invite Create
     *
     * When an invite is created
     */
    INVITE_CREATE: 40,

    /**
     * Invite Update
     *
     * When an invite is updated
     */
    INVITE_UPDATE: 41,

    /**
     * Invite Delete
     *
     * When an invite is deleted
     */
    INVITE_DELETE: 42,

    /**
     * Webhook Create
     *
     * When a webhook is created
     */
    WEBHOOK_CREATE: 50,

    /**
     * Webhook Update
     *
     * When a webhook is updated
     */
    WEBHOOK_UPDATE: 51,

    /**
     * Webhook Delete
     *
     * When a webhook is deleted
     */
    WEBHOOK_DELETE: 52,

    /**
     * Emoji Create
     *
     * When an emoji is created
     */
    EMOJI_CREATE: 60,

    /**
     * Emoji Update
     *
     * When an emoji is updated
     */
    EMOJI_UPDATE: 61,

    /**
     * Emoji Delete
     *
     * When an emoji is deleted
     */
    EMOJI_DELETE: 62,

    /**
     * Message Delete
     *
     * When a message is deleted
     */
    MESSAGE_DELETE: 72,

    /**
     * Message Bulk Delete
     *
     * When messages are deleted in bulk
     */
    MESSAGE_BULK_DELETE: 73,

    /**
     * Message Pin
     *
     * When a message is pinned
     */
    MESSAGE_PIN: 74,

    /**
     * Message Unpin
     *
     * When a message is unpinned
     */
    MESSAGE_UNPIN: 75,

    /**
     * Integration Create
     *
     * When an integration is created
     */
    INTEGRATION_CREATE: 80,

    /**
     * Integration Update
     *
     * When an integration is updated
     */
    INTEGRATION_UPDATE: 81,

    /**
     * Integration Delete
     *
     * When an integration is deleted
     */
    INTEGRATION_DELETE: 82,

    /**
     * Stage Instance Create
     *
     * When a stage instance is created
     */
    STAGE_INSTANCE_CREATE: 83,

    /**
     * Stage Instance Update
     *
     * When a stage instance is updated
     */
    STAGE_INSTANCE_UPDATE: 84,

    /**
     * Stage Instance Delete
     *
     * When a stage instance is deleted
     */
    STAGE_INSTANCE_DELETE: 85,

    /**
     * Sticker Create
     *
     * When a sticker is created
     */
    STICKER_CREATE: 90,

    /**
     * Sticker Update
     *
     * When a sticker is updated
     */
    STICKER_UPDATE: 91,

    /**
     * Sticker Delete
     *
     * When a sticker is deleted
     */
    STICKER_DELETE: 92
} = {
    GUILD_UPDATE: 1,
    CHANNEL_CREATE: 10,
    CHANNEL_UPDATE: 11,
    CHANNEL_DELETE: 12,
    CHANNEL_OVERWRITE_CREATE: 13,
    CHANNEL_OVERWRITE_UPDATE: 14,
    CHANNEL_OVERWRITE_DELETE: 15,
    MEMBER_KICK: 20,
    MEMBER_PRUNE: 21,
    MEMBER_BAN_ADD: 22,
    MEMBER_BAN_REMOVE: 23,
    MEMBER_UPDATE: 24,
    MEMBER_ROLE_UPDATE: 25,
    MEMBER_MOVE: 26,
    MEMBER_DISCONNECT: 27,
    BOT_ADD: 28,
    ROLE_CREATE: 30,
    ROLE_UPDATE: 31,
    ROLE_DELETE: 32,
    INVITE_CREATE: 40,
    INVITE_UPDATE: 41,
    INVITE_DELETE: 42,
    WEBHOOK_CREATE: 50,
    WEBHOOK_UPDATE: 51,
    WEBHOOK_DELETE: 52,
    EMOJI_CREATE: 60,
    EMOJI_UPDATE: 61,
    EMOJI_DELETE: 62,
    MESSAGE_DELETE: 72,
    MESSAGE_BULK_DELETE: 73,
    MESSAGE_PIN: 74,
    MESSAGE_UNPIN: 75,
    INTEGRATION_CREATE: 80,
    INTEGRATION_UPDATE: 81,
    INTEGRATION_DELETE: 82,
    STAGE_INSTANCE_CREATE: 83,
    STAGE_INSTANCE_UPDATE: 84,
    STAGE_INSTANCE_DELETE: 85,
    STICKER_CREATE: 90,
    STICKER_UPDATE: 91,
    STICKER_DELETE: 92
}

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
export type AuditLogChangeType = "name" | "description" | "icon" | "splash" | "discoverySplash" | "banner" | "ownerID" | "region" | "preferredLocale" | "afkChannelID" | "afkTimeout" | "rulesChannelID" | "publicUpdatesChannelID" | "mfaLevel" | "verificationLevel" | "explicitContentFilter" | "defaultMessageNotifications" | "vanityURLCode" | "add" | "remove" | "pruneDeleteDays" | "widgetEnabled" | "widgetChannelID" | "systemChannelID" | "position" | "topic" | "bitrate" | "permissionOverwrites" | "nsfw" | "applicationID" | "rateLimitPerUser" | "permissions" | "color" | "hoist" | "mentionable" | "allow" | "deny" | "code" | "channelID" | "inviterID" | "maxUses" | "uses" | "maxAge" | "temporary" | "deaf" | "mute" | "nick" | "avatar" | "id" | "type" | "enableEmoticons" | "expireBehavior" | "expireGracePeriod" | "userLimit" | "privacyLevel" | "tags" | "formatType" | "asset" | "available" | "guildID" | "archived" | "locked" | "autoArchiveDuration" | "defaultAutoArchiveDuration";

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