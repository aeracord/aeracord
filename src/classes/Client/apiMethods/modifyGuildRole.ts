import { Client, FetchQueue, Guild, GuildResolvable, PermissionError, RawRoleData, Role, RoleResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface ModifyGuildRoleData {
    name?: string;
    permissions?: string;
    color?: number | null;
    hoist?: boolean;
    mentionable?: boolean;
}

export default async function modifyGuildRole(client: Client, guildResolvable: GuildResolvable, roleResolvable: RoleResolvable, modifyGuildRoleData: ModifyGuildRoleData, reason?: string): Promise<Role> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const roleID: string | undefined = Role.resolveID(roleResolvable);
    if (!roleID) throw new Error("Invalid role resolvable");

    // Missing permissions
    if (!client.hasPermission("MANAGE_ROLES", guildID)) throw new PermissionError({ permission: "MANAGE_ROLES" });
    if (!client.canManageRoles(guildID, roleID)) throw new PermissionError({ role: roleID });

    // Define fetch data
    const path: string = `/guilds/${guildID}/roles/${roleID}`;
    const method: string = "PATCH";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawRoleData = await fetchQueue.request({
        path,
        method,
        data: {
            name: modifyGuildRoleData.name,
            permissions: modifyGuildRoleData.permissions,
            color: modifyGuildRoleData.color,
            hoist: modifyGuildRoleData.hoist,
            mentionable: modifyGuildRoleData.mentionable
        },
        auditLogReason: reason
    });

    // Parse role
    const role: Role = Role._fromRawData(client, result, guildID);

    // Return
    return role;
}