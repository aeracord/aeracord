import { Client, Guild, RawGuildRoleUpdateData, Role, RoleData } from "../../../../internal";

export default function guildRoleUpdate(client: Client, rawData: RawGuildRoleUpdateData) {

    // Get old role data
    const oldRole: Role | undefined = client.roles.get(rawData.role.id);
    const oldRoleData: RoleData | undefined = oldRole && Role.toData(oldRole);

    // Parse role
    const role: Role = Role._fromRawData(client, rawData.role, rawData.guild_id);

    // Get guild
    const guild: Guild | undefined = client.guilds.get(role.guildID);

    // Update roles
    if (guild) {

        // Get role data index
        const roleDataIndex: number = guild.roleData.findIndex((r: RoleData) => r.id === role.id);

        // Update roles
        if (roleDataIndex !== -1) guild.roleData.splice(roleDataIndex, 1, Role.toData(role));
        else guild.roleData.push(Role.toData(role));
    }

    // Emit event
    client.emit("guildRoleUpdate", role, {
        rawData,
        guild: client.guilds.get(role.guildID),
        oldRoleData
    });
}