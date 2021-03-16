import { Client, RawAuditLogData } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";

export interface AuditLogData {
    guildID: string;
    entries: AuditLogEntry[];
}

export interface AuditLogEntry {
    id: string;
    event: AuditLogEvent;
    targetID?: string;
    actorID: string;
    changes?: AuditLogChange[];
    options?: AuditLogOptions;
    reason?: string;
}

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

export interface AuditLogChange {
    type: AuditLogChangeType;
    oldValue?: any;
    newValue?: any;
}

export type AuditLogChangeType = "name" | "description" | "icon" | "splash" | "discoverySplash" | "banner" | "ownerID" | "region" | "preferredLocale" | "afkChannelID" | "afkTimeout" | "rulesChannelID" | "publicUpdatesChannelID" | "mfaLevel" | "verificationLevel" | "explicitContentFilter" | "defaultMessageNotifications" | "vanityURLCode" | "add" | "remove" | "pruneDeleteDays" | "widgetEnabled" | "widgetChannelID" | "systemChannelID" | "position" | "topic" | "bitrate" | "permissionOverwrites" | "nsfw" | "applicationID" | "rateLimitPerUser" | "permissions" | "color" | "hoist" | "mentionable" | "allow" | "deny" | "code" | "channelID" | "inviterID" | "maxUses" | "uses" | "maxAge" | "temporary" | "deaf" | "mute" | "nick" | "avatar" | "id" | "type" | "enableEmoticons" | "expireBehavior" | "expireGracePeriod" | "userLimit";

export interface AuditLogOptions {
    deleteMemberDays?: number;
    membersRemoved?: number;
    channelID?: string;
    messageID?: string;
    count?: number;
    id?: string;
    type?: string;
    roleName?: string;
}

export default class AuditLog {

    /**
     * Client
     *
     * The client
     */
    client: Client;

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

    /**
     * Audit Log
     *
     * @param client The client
     * @param auditLogData Options to initialize this audit log with
     * @param auditLogData.guildID The ID of the guild this audit log is in
     * @param auditLogData.entries The audit log's entries
     */
    constructor(client: Client, auditLogData: AuditLogData) {

        // Set data
        this.client = client;
        this.guildID = auditLogData.guildID;
        this.entries = auditLogData.entries;
    }

    /**
     * From Raw Data
     *
     * Create an `AuditLogData` object from a `RawAuditLogData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {AuditLogData} The audit log data
     */
    static _fromRawData(rawData: RawAuditLogData, guildID: string): AuditLogData {
        return fromRawData(rawData, guildID);
    }

    /**
     * From Data
     *
     * Create an `AuditLog` from an `AuditLogData` object
     *
     * @param auditLogData The audit log data
     *
     * @returns {AuditLog} The audit log
     */
    static fromData(client: Client, auditLogData: AuditLogData): AuditLog {
        return fromData(client, auditLogData);
    }
}