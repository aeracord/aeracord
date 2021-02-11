import { Client, Role } from "../../../internal";
import { RawRoleData } from "./rawRoleData";

export default function parseRole(client: Client, rawData: RawRoleData, guildID: string): Role {

    // Parse role
    const role: Role = new Role(client, {
        id: rawData.id,
        name: rawData.name,
        guildID,
        color: rawData.color,
        hoist: rawData.hoist,
        position: rawData.position,
        permissions: rawData.permissions,
        mentionable: rawData.mentionable,
        managed: rawData.managed,
        tags: {
            botID: rawData.tags?.bot_id,
            integrationID: rawData.tags?.integration_id,

            // `tags.premium_subscriber` is either `undefined` (false) or `null` (true)
            // Look, I didnt make the damn api
            premiumRole: rawData.tags?.premium_subscriber === null
        }
    });

    // Return
    return role;
}