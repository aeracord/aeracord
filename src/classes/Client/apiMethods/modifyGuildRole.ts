import { Client, FetchQueue, Guild, GuildResolvable, RawRoleData, Role, RoleData, RoleResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface ModifyGuildRoleData {
    name?: string;
    permissions?: string;
    color?: number | null;
    hoist?: boolean;
    mentionable?: boolean;
}

export default async function modifyGuildRole(client: Client, guildResolvable: GuildResolvable, roleResolvable: RoleResolvable, modifyGuildRoleData: ModifyGuildRoleData): Promise<RoleData> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const roleID: string | undefined = Role.resolveID(roleResolvable);
    if (!roleID) throw new Error("Invalid role resolvable");

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
        }
    });

    // Parse role data
    const roleData: RoleData = Role._fromRawData(client, result, guildID);

    // Return
    return roleData;
}