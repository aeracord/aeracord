import { Role, RoleData } from "../../internal";

export default function toData(role: Role): RoleData {

    // Parse role data
    return {
        id: role.id,
        name: role.name,
        guildID: role.guildID,
        color: role.color,
        hoist: role.hoist,
        position: role.position,
        permissions: role.permissions,
        mentionable: role.mentionable,
        managed: role.managed,
        tags: {
            botID: role.tags.botID,
            integrationID: role.tags.integrationID,
            premiumRole: role.tags.premiumRole
        }
    };
}