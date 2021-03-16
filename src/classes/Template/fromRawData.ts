import { RawTemplateData, RawTemplateDataGuildChannel, RawTemplateDataGuildChannelPermissionOverwrite, RawTemplateDataGuildRole, TemplateData, User } from "../../internal";

export default function fromRawData(rawData: RawTemplateData): TemplateData {

    // Parse template data
    return {
        code: rawData.code,
        name: rawData.name,
        description: rawData.description || undefined,
        uses: rawData.usage_count,
        creator: User._fromRawData(rawData.creator),
        createdAt: new Date(rawData.created_at).getTime(),
        updatedAt: new Date(rawData.updated_at).getTime(),
        sourceGuildID: rawData.source_guild_id,
        sourceGuild: {
            name: rawData.serialized_source_guild.name,
            icon: rawData.serialized_source_guild.icon_hash || undefined,
            region: rawData.serialized_source_guild.region,
            afkChannelID: rawData.serialized_source_guild.afk_channel_id || undefined,
            afkTimeout: rawData.serialized_source_guild.afk_timeout,
            verificationLevel: rawData.serialized_source_guild.verification_level,
            defaultMessageNotifications: rawData.serialized_source_guild.default_message_notifications,
            explicitContentFilter: rawData.serialized_source_guild.explicit_content_filter,
            roles: rawData.serialized_source_guild.roles.map((r: RawTemplateDataGuildRole) => ({
                id: r.id,
                name: r.name,
                color: r.color,
                hoist: r.hoist,
                permissions: r.permissions,
                mentionable: r.mentionable
            })),
            channels: rawData.serialized_source_guild.channels.map((c: RawTemplateDataGuildChannel) => ({
                id: c.id,
                type: c.type,
                name: c.name,
                topic: c.topic || undefined,
                position: c.position,
                nsfw: c.nsfw,
                permissionOverwrites: c.permission_overwrites.map((p: RawTemplateDataGuildChannelPermissionOverwrite) => ({
                    id: p.id,
                    allow: p.allow,
                    deny: p.deny
                })),
                bitrate: c.bitrate,
                userLimit: c.user_limit,
                rateLimitPerUser: c.rate_limit_per_user,
                parentID: c.parent_id || undefined
            })),
            systemChannelID: rawData.serialized_source_guild.system_channel_id || undefined,
            systemChannelFlags: rawData.serialized_source_guild.system_channel_flags,
            description: rawData.serialized_source_guild.description || undefined,
            preferredLocale: rawData.serialized_source_guild.preferred_locale
        },
        dirty: Boolean(rawData.is_dirty)
    };
}