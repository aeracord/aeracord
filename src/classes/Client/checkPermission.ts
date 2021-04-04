import { PermissionsResolvable, PermissionOverwrite, RolePermissionData } from "../../internal";

export default function checkPermission(permission: PermissionsResolvable, rolePermissions: RolePermissionData[], channelPermissionOverwrites?: PermissionOverwrite[]): boolean {

    // Define permitted
    let permitted: boolean = false;

    // Check role permissions
    permitted = rolePermissions.some((r: RolePermissionData) => r.permissions.has(permission));

    // Check denied channel permissions
    if ((channelPermissionOverwrites) && (channelPermissionOverwrites.some((p: PermissionOverwrite) => p.deny.has(permission)))) permitted = false;

    // Check allowed channel permissions
    if ((channelPermissionOverwrites) && (channelPermissionOverwrites.some((p: PermissionOverwrite) => p.allow.has(permission)))) permitted = true;

    // Return
    return permitted;
}