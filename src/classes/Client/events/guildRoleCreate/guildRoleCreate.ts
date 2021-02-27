import { Client, Role } from "../../../../internal";
import { RawGuildRoleCreateData } from "./rawGuildRoleCreateData";

export default function guildRoleCreate(client: Client, rawData: RawGuildRoleCreateData) {

    // Parse role
    const role: Role = Role._fromRawData(client, rawData.role, rawData.guild_id);

    // Emit event
    client.emit("guildRoleCreate", role, rawData);
}