import { Client, RawRoleData, Role, RoleData } from "../../internal";

export default function fromRawData(client: Client, rawData: RawRoleData, guildID: string): RoleData {

    // Parse role data
    const roleData: RoleData = {
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
            botID: rawData.tags?.bot_id || null,
            integrationID: rawData.tags?.integration_id || null,

            // `tags.premium_subscriber` is either `undefined` (false) or `null` (true)
            // Look, I didnt make the damn api
            premiumRole: rawData.tags?.premium_subscriber === null
        }
    };

    // Create role or update object
    if (client._roles.cacheAll) Role.fromData(client, roleData);
    else Role._updateObjectFromData(client, roleData);

    // Return
    return roleData;
}