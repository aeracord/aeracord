import { Client, Role, RoleData } from "../../../../internal";
import { RawGuildRoleUpdateData } from "./rawGuildRoleUpdateData";

export default function guildRoleUpdate(client: Client, rawData: RawGuildRoleUpdateData) {

    // Parse role data
    const roleData: RoleData = Role._fromRawData(rawData.role, rawData.guild_id);

    // Emit event
    client.emit("guildRoleUpdate", roleData, rawData);
}