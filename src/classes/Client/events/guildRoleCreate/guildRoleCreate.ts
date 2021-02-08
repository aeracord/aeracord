import { Client, Role } from "../../../../internal";
import parseRole from "../parseRole";
import { RawRoleData } from "../rawRoleData";

export default function guildRoleCreate(client: Client, rawData: RawRoleData) {

    // Parse role
    const role: Role = parseRole(client, rawData);

    // Emit event
    client.emit("guildRoleCreate", role, rawData);
}