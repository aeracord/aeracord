import { Client, Role } from "../../../../internal";
import parseRole from "../parseRole";
import { RawGuildRoleCreateData } from "./rawGuildRoleCreateData";

export default function guildRoleCreate(client: Client, rawData: RawGuildRoleCreateData) {

    // Parse role
    const role: Role = parseRole(client, rawData.role, rawData.guild_id);

    // Emit event
    client.emit("guildRoleCreate", role, rawData);
}