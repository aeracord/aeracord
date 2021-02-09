import { Client, Role } from "../../../internal";
import { RawRoleData } from "./rawRoleData";

export default function parseRole(client: Client, rawData: RawRoleData): Role {

    // Parse role
    const role: Role = new Role(client, {
        id: rawData.role.id,
        name: rawData.role.name,
        guildID: rawData.guild_id,
        color: rawData.role.color,
        hoist: rawData.role.hoist,
        position: rawData.role.position,
        permissions: rawData.role.permissions,
        mentionable: rawData.role.mentionable,
        managed: rawData.role.managed,
        tags: {
            botID: rawData.role.tags?.bot_id,
            integrationID: rawData.role.tags?.integration_id,

            // `tags.premium_subscriber` is either `undefined` (false) or `null` (true)
            // Look, I didnt make the damn api
            premiumRole: rawData.role.tags?.premium_subscriber === null
        }
    });

    // Return
    return role;
}