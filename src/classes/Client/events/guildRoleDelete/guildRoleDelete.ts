import { Client, Role } from "../../../../internal";
import { GuildRoleDeleteData } from "./guildRoleDeleteData";
import { RawGuildRoleDeleteData } from "./rawGuildRoleDeleteData";

export default function guildRoleDelete(client: Client, rawData: RawGuildRoleDeleteData) {

    // Parse data
    const data: GuildRoleDeleteData = {
        id: rawData.role_id,
        guildID: rawData.guild_id
    };

    // Get role
    const role: Role | undefined = client.roles.get(data.id);

    // Remove from cache
    if (role) role.uncache();

    // Emit event
    client.emit("guildRoleDelete", data, {
        rawData,
        role,
        guild: client.guilds.get(data.guildID)
    });
}