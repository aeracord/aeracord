import { Client, Role, RoleData } from "../../../../internal";
import { RawGuildRoleCreateData } from "./rawGuildRoleCreateData";

export default function guildRoleCreate(client: Client, rawData: RawGuildRoleCreateData) {

    // Parse role data
    const roleData: RoleData = Role._fromRawData(rawData.role, rawData.guild_id);

    // Emit event
    client.emit("guildRoleCreate", roleData, rawData);
}