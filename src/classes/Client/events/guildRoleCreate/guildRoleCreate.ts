import { Client, RawGuildRoleCreateData, Role } from "../../../../internal";

export default function guildRoleCreate(client: Client, rawData: RawGuildRoleCreateData) {

    // Parse role
    const role: Role = Role._fromRawData(client, rawData.role, rawData.guild_id);

    // Add to guild roles
    if (client._guildRoles) {
        const guildRoles: string[] | undefined = client._guildRoles.get(role.guildID);
        if (guildRoles) guildRoles.push(role.id);
    }

    // Emit event
    client.emit("guildRoleCreate", role, {
        rawData,
        guild: client.guilds.get(role.guildID)
    });
}