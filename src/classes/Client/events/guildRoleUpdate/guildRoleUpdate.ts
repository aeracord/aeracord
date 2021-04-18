import { Client, RawGuildRoleUpdateData, Role, RoleData } from "../../../../internal";

export default function guildRoleUpdate(client: Client, rawData: RawGuildRoleUpdateData) {

    // Get old role data
    const oldRole: Role | undefined = client.roles.get(rawData.role.id);
    const oldRoleData: RoleData | undefined = oldRole && Role.toData(oldRole);

    // Parse role
    const role: Role = Role._fromRawData(client, rawData.role, rawData.guild_id);

    // Emit event
    client.emit("guildRoleUpdate", role, {
        rawData,
        guild: client.guilds.get(role.guildID),
        oldRoleData
    });
}