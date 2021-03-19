import { Client, Role, RoleData } from "../../internal";

export default function fromRawData(client: Client, roleData: RoleData): Role {

    // Get role from cache
    let role: Role | undefined = client.roles.get(roleData.id);

    // Update role object
    if (role) Role._updateObject(role, roleData);

    // Create role
    else role = new Role(client, roleData);

    // Return
    return role;
}