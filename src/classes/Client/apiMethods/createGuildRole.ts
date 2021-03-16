import { Client, FetchQueue, Guild, GuildResolvable, RawRoleData, Role, RoleData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface CreateGuildRoleData {
    name?: string;
    permissions?: string;
    color?: number;
    hoist?: boolean;
    mentionable?: boolean;
}

export default async function createGuildRole(client: Client, guildResolvable: GuildResolvable, createGuildRoleData: CreateGuildRoleData): Promise<RoleData> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");

    // Define fetch data
    const path: string = `/guilds/${guildID}/roles`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawRoleData = await fetchQueue.request({
        path,
        method,
        data: {
            name: createGuildRoleData.name,
            permissions: createGuildRoleData.permissions,
            color: createGuildRoleData.color,
            hoist: createGuildRoleData.hoist,
            mentionable: createGuildRoleData.mentionable
        }
    });

    // Parse role data
    const roleData: RoleData = Role._fromRawData(result, guildID);

    // Return
    return roleData;
}