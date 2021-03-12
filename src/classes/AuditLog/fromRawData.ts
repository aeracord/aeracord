import { AuditLog, AuditLogChangeType, Client, RawAuditLogData, RawAuditLogDataEntry, RawAuditLogDataEntryChange, RawAuditLogDataEntryChangeKey } from "../../internal";

export default function fromRawData(client: Client, rawData: RawAuditLogData, guildID: string): AuditLog {

    // Parse audit log
    const auditLog: AuditLog = new AuditLog(client, {
        guildID,
        entries: rawData.audit_log_entries.map((e: RawAuditLogDataEntry) => ({
            id: e.id,
            event: e.action_type,
            targetID: e.target_id || undefined,
            actorID: e.user_id,
            changes: e.changes && e.changes.map((c: RawAuditLogDataEntryChange) => ({
                type: parseEntryChangeType(c.key),
                oldValue: c.old_value,
                newValue: c.new_value
            })),
            options: e.options && {
                deleteMemberDays: e.options.delete_member_days !== undefined ? parseInt(e.options.delete_member_days) : undefined,
                membersRemoved: e.options.members_removed !== undefined ? parseInt(e.options.members_removed) : undefined,
                channelID: e.options.channel_id,
                messageID: e.options.message_id,
                count: e.options.count !== undefined ? parseInt(e.options.count) : undefined,
                id: e.options.id,
                type: e.options.type,
                roleName: e.options.role_name
            },
            reason: e.reason
        }))
    });

    // Return
    return auditLog;
}

const parseEntryChangeType = (rawType: RawAuditLogDataEntryChangeKey): AuditLogChangeType => {

    // Parse type
    if (rawType === "name") return "name";
    else if (rawType === "description") return "description";
    else if (rawType === "icon_hash") return "icon";
    else if (rawType === "splash_hash") return "splash";
    else if (rawType === "discovery_splash_hash") return "discoverySplash";
    else if (rawType === "banner_hash") return "banner";
    else if (rawType === "owner_id") return "ownerID";
    else if (rawType === "region") return "region";
    else if (rawType === "preferred_locale") return "preferredLocale";
    else if (rawType === "afk_channel_id") return "afkChannelID";
    else if (rawType === "afk_timeout") return "afkTimeout";
    else if (rawType === "rules_channel_id") return "rulesChannelID";
    else if (rawType === "public_updates_channel_id") return "publicUpdatesChannelID";
    else if (rawType === "mfa_level") return "mfaLevel";
    else if (rawType === "verification_level") return "verificationLevel";
    else if (rawType === "explicit_content_filter") return "explicitContentFilter";
    else if (rawType === "default_message_notifications") return "defaultMessageNotifications";
    else if (rawType === "vanity_url_code") return "vanityURLCode";
    else if (rawType === "$add") return "add";
    else if (rawType === "$remove") return "remove";
    else if (rawType === "prune_delete_days") return "pruneDeleteDays";
    else if (rawType === "widget_enabled") return "widgetEnabled";
    else if (rawType === "widget_channel_id") return "widgetChannelID";
    else if (rawType === "system_channel_id") return "systemChannelID";
    else if (rawType === "position") return "position";
    else if (rawType === "topic") return "topic";
    else if (rawType === "bitrate") return "bitrate";
    else if (rawType === "permission_overwrites") return "permissionOverwrites";
    else if (rawType === "nsfw") return "nsfw";
    else if (rawType === "application_id") return "applicationID";
    else if (rawType === "rate_limit_per_user") return "rateLimitPerUser";
    else if (rawType === "permissions") return "permissions";
    else if (rawType === "color") return "color";
    else if (rawType === "hoist") return "hoist";
    else if (rawType === "mentionable") return "mentionable";
    else if (rawType === "allow") return "allow";
    else if (rawType === "deny") return "deny";
    else if (rawType === "code") return "code";
    else if (rawType === "channel_id") return "channelID";
    else if (rawType === "inviter_id") return "inviterID";
    else if (rawType === "max_uses") return "maxUses";
    else if (rawType === "uses") return "uses";
    else if (rawType === "max_age") return "maxAge";
    else if (rawType === "temporary") return "temporary";
    else if (rawType === "deaf") return "deaf";
    else if (rawType === "mute") return "mute";
    else if (rawType === "nick") return "nick";
    else if (rawType === "avatar_hash") return "avatar";
    else if (rawType === "id") return "id";
    else if (rawType === "type") return "type";
    else if (rawType === "enable_emoticons") return "enableEmoticons";
    else if (rawType === "expire_behavior") return "expireBehavior";
    else if (rawType === "expire_grace_period") return "expireGracePeriod";
    else if (rawType === "user_limit") return "userLimit";
    else return rawType;
}