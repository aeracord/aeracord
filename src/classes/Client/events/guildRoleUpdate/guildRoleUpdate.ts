import { Client, Role } from "../../../../internal";
import parseRole from "../parseRole";
import { RawRoleData } from "../rawRoleData";

export default function guildRoleUpdate(client: Client, rawData: RawRoleData) {

    // Parse role
    const role: Role = parseRole(client, rawData);

    // Emit event
    client.emit("guildRoleUpdate", role, rawData);
}