import { Client, Role, RoleData } from "../../internal";

export default function updateObjectFromData(client: Client, roleData: RoleData): Role | undefined {

    // Get role from cache
    let role: Role | undefined = client.roles.get(roleData.id);

    // Update role object
    if (role) Role._updateObject(role, roleData);

    // Set role permissions
    if (client._rolePermissions) client._rolePermissions.set(roleData.id, {
        position: roleData.position,
        permissions: roleData.permissions
    });

    // Return
    return role;
}