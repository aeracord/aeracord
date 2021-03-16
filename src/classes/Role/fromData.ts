import { Client, Role, RoleData } from "../../internal";

export default function fromRawData(client: Client, roleData: RoleData): Role {

    // Create role
    const role: Role = new Role(client, roleData);

    // Return
    return role;
}