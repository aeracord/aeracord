import { Client } from "../../../../internal";
import { GuildRoleDeleteData } from "./guildRoleDeleteData";
import { RawGuildRoleDeleteData } from "./rawGuildRoleDeleteData";

export default function guildRoleDelete(client: Client, rawData: RawGuildRoleDeleteData) {

    // Parse data
    const data: GuildRoleDeleteData = {
        id: rawData.role_id,
        guildID: rawData.guild_id
    };

    // Emit event
    client.emit("guildRoleDelete", data, {
        rawData,
        role: client.roles.get(data.id),
        guild: client.guilds.get(data.guildID)
    });
}