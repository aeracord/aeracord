import { Client, Role, RoleData } from "../../internal";

export default function fromData(client: Client, roleData: RoleData): Role {

    // Get role from cache
    let role: Role | undefined = client.roles.get(roleData.id);

    // Create role
    if (!role) role = new Role(client, roleData);

    // Return
    return role;
}