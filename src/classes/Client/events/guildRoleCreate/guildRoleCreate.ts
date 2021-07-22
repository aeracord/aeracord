import { Client, Guild, RawGuildRoleCreateData, Role } from "../../../../internal";

export default function guildRoleCreate(client: Client, rawData: RawGuildRoleCreateData) {

    // Parse role
    const role: Role = Role._fromRawData(client, rawData.role, rawData.guild_id);

    // Get guild
    const guild: Guild | undefined = client.guilds.get(role.guildID);

    // Add to roles
    if (guild) guild.roleData.push(Role.toData(role));

    // Add to guild roles
    const guildRoles: string[] | undefined = client._guildRoles.get(role.guildID);
    if (guildRoles) guildRoles.push(role.id);

    // Emit event
    client.emit("guildRoleCreate", role, {
        rawData,
        guild: client.guilds.get(role.guildID)
    });
}