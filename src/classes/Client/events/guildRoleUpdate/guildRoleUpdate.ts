import { Client, Role } from "../../../../internal";
import parseRole from "../parseRole";
import { RawGuildRoleUpdateData } from "./rawGuildRoleUpdateData";

export default function guildRoleUpdate(client: Client, rawData: RawGuildRoleUpdateData) {

    // Parse role
    const role: Role = parseRole(client, rawData.role, rawData.guild_id);

    // Emit event
    client.emit("guildRoleUpdate", role, rawData);
}