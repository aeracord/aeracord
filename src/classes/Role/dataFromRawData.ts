import { Client, Permissions, RawRoleData, RoleData } from "../../internal";

export default function dataFromRawData(client: Client, rawData: RawRoleData, guildID: string): RoleData {

    // Parse role data
    const roleData: RoleData = {
        id: rawData.id,
        name: rawData.name,
        guildID,
        color: rawData.color,
        hoist: rawData.hoist,
        position: rawData.position,
        permissions: new Permissions(rawData.permissions),
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

    // Set role permissions
    if (client._rolePermissions) client._rolePermissions.set(roleData.id, {
        position: roleData.position,
        permissions: roleData.permissions
    });

    // Return
    return roleData;
}