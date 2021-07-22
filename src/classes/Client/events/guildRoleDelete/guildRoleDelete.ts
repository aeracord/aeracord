import { Client, Guild, GuildRoleDeleteData, RawGuildRoleDeleteData, Role, RoleData } from "../../../../internal";

export default function guildRoleDelete(client: Client, rawData: RawGuildRoleDeleteData) {

    // Parse data
    const data: GuildRoleDeleteData = {
        id: rawData.role_id,
        guildID: rawData.guild_id
    };

    // Get role
    const role: Role | undefined = client.roles.get(data.id);

    // Get guild
    const guild: Guild | undefined = client.guilds.get(data.guildID);

    // Remove from roles
    if (guild) {

        // Get role data index
        const roleDataIndex: number = guild.roleData.findIndex((r: RoleData) => r.id === data.id);

        // Remove from roles
        if (roleDataIndex !== -1) guild.roleData.splice(roleDataIndex, 1);
    }

    // Mark as deleted
    if (role) role._markAsDeleted();

    // Remove from guild roles
    const guildRoles: string[] | undefined = client._guildRoles.get(data.guildID);
    if ((guildRoles) && (guildRoles.includes(data.id))) guildRoles.splice(guildRoles.indexOf(data.id), 1);

    // Remove from role permissions
    client._rolePermissions.delete(data.id);

    // Emit event
    client.emit("guildRoleDelete", data, {
        rawData,
        role,
        guild: client.guilds.get(data.guildID)
    });
}