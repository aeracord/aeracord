import { Template, TemplateData, TemplateGuildChannel, TemplateGuildChannelPermissionOverwrite, TemplateGuildRole } from "../../internal";

export default function toData(template: Template): TemplateData {

    // Parse template data
    return {
        code: template.code,
        name: template.name,
        description: template.description,
        uses: template.uses,
        creator: template.creator,
        createdAt: template.createdAt,
        updatedAt: template.updatedAt,
        sourceGuildID: template.sourceGuildID,
        sourceGuild: {
            name: template.sourceGuild.name,
            icon: template.sourceGuild.icon,
            region: template.sourceGuild.region,
            afkChannelID: template.sourceGuild.afkChannelID,
            afkTimeout: template.sourceGuild.afkTimeout,
            verificationLevel: template.sourceGuild.verificationLevel,
            defaultMessageNotifications: template.sourceGuild.defaultMessageNotifications,
            explicitContentFilter: template.sourceGuild.explicitContentFilter,
            roles: template.sourceGuild.roles.map((r: TemplateGuildRole) => ({
                id: r.id,
                name: r.name,
                color: r.color,
                hoist: r.hoist,
                permissions: r.permissions,
                mentionable: r.mentionable
            })),
            channels: template.sourceGuild.channels.map((c: TemplateGuildChannel) => ({
                id: c.id,
                type: c.type,
                name: c.name,
                topic: c.topic,
                position: c.position,
                nsfw: c.nsfw,
                permissionOverwrites: c.permissionOverwrites.map((p: TemplateGuildChannelPermissionOverwrite) => ({
                    id: p.id,
                    allow: p.allow,
                    deny: p.deny
                })),
                bitrate: c.bitrate,
                userLimit: c.userLimit,
                rateLimitPerUser: c.rateLimitPerUser,
                parentID: c.parentID
            })),
            systemChannelID: template.sourceGuild.systemChannelID,
            systemChannelFlags: template.sourceGuild.systemChannelFlags,
            description: template.sourceGuild.description,
            preferredLocale: template.sourceGuild.preferredLocale
        },
        dirty: template.dirty,
        fetchedAt: template._lastUpdatedAt
    };
}