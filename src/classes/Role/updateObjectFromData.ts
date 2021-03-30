import { Client, Role, RoleData } from "../../internal";

export default function updateObjectFromData(client: Client, roleData: RoleData): Role | undefined {

    // Get role from cache
    let role: Role | undefined = client.roles.get(roleData.id);

    // Update role object
    if (role) Role._updateObject(role, roleData);

    // Return
    return role;
}