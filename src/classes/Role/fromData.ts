import { Client, Role, RoleData } from "../../internal";

export default function fromData(client: Client, roleData: RoleData): Role {

    // Update cached role
    let role: Role | undefined = Role._updateObjectFromData(client, roleData);

    // Create role
    if (!role) role = new Role(client, roleData);

    // Return
    return role;
}