import { Client, Role } from "../../../../internal";
import { RawGuildRoleUpdateData } from "./rawGuildRoleUpdateData";

export default function guildRoleUpdate(client: Client, rawData: RawGuildRoleUpdateData) {

    // Parse role
    const role: Role = Role._fromRawData(client, rawData.role, rawData.guild_id);

    // Emit event
    client.emit("guildRoleUpdate", role, rawData);
}