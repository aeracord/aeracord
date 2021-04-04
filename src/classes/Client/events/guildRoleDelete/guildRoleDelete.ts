import { Client, GuildRoleDeleteData, RawGuildRoleDeleteData, Role } from "../../../../internal";

export default function guildRoleDelete(client: Client, rawData: RawGuildRoleDeleteData) {

    // Parse data
    const data: GuildRoleDeleteData = {
        id: rawData.role_id,
        guildID: rawData.guild_id
    };

    // Get role
    const role: Role | undefined = client.roles.get(data.id);

    // Mark as deleted
    if (role) role._markAsDeleted();

    // Remove from guild roles
    if (client._guildRoles) {
        const guildRoles: string[] | undefined = client._guildRoles.get(data.guildID);
        if ((guildRoles) && (guildRoles.includes(data.id))) guildRoles.splice(guildRoles.indexOf(data.id), 1);
    }

    // Remove from role permissions
    if (client._rolePermissions) client._rolePermissions.delete(data.id);

    // Emit event
    client.emit("guildRoleDelete", data, {
        rawData,
        role,
        guild: client.guilds.get(data.guildID)
    });
}