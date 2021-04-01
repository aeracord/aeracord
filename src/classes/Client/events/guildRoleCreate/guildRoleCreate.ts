import { Client, RawGuildRoleCreateData, Role, RoleData } from "../../../../internal";

export default function guildRoleCreate(client: Client, rawData: RawGuildRoleCreateData) {

    // Parse role data
    const roleData: RoleData = Role._fromRawData(client, rawData.role, rawData.guild_id);

    // Emit event
    client.emit("guildRoleCreate", roleData, {
        rawData,
        role: client.roles.get(roleData.id),
        guild: client.guilds.get(roleData.guildID)
    });
}