import { Client, RawTemplateData, RawTemplateDataGuildChannel, RawTemplateDataGuildChannelPermissionOverwrite, RawTemplateDataGuildRole, Template, TemplateData, User } from "../../internal";

export default function fromRawData(client: Client, rawData: RawTemplateData): TemplateData {

    // Parse template data
    const templateData: TemplateData = {
        code: rawData.code,
        name: rawData.name,
        description: rawData.description,
        uses: rawData.usage_count,
        creator: User._fromRawData(client, rawData.creator),
        createdAt: new Date(rawData.created_at).getTime(),
        updatedAt: new Date(rawData.updated_at).getTime(),
        sourceGuildID: rawData.source_guild_id,
        sourceGuild: {
            name: rawData.serialized_source_guild.name,
            icon: rawData.serialized_source_guild.icon_hash,
            region: rawData.serialized_source_guild.region,
            afkChannelID: rawData.serialized_source_guild.afk_channel_id,
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
                topic: c.topic,
                position: c.position,
                nsfw: c.nsfw,
                permissionOverwrites: c.permission_overwrites.map((p: RawTemplateDataGuildChannelPermissionOverwrite) => ({
                    id: p.id,
                    allow: p.allow,
                    deny: p.deny
                })),
                bitrate: c.bitrate || null,
                userLimit: c.user_limit || null,
                rateLimitPerUser: c.rate_limit_per_user || null,
                parentID: c.parent_id
            })),
            systemChannelID: rawData.serialized_source_guild.system_channel_id,
            systemChannelFlags: rawData.serialized_source_guild.system_channel_flags,
            description: rawData.serialized_source_guild.description,
            preferredLocale: rawData.serialized_source_guild.preferred_locale
        },
        dirty: Boolean(rawData.is_dirty)
    };

    // Create template object
    if (client._templates.cacheAll) Template.fromData(client, templateData);

    // Return
    return templateData;
}