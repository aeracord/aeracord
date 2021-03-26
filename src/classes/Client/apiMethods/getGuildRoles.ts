import { Client, FetchQueue, Guild, GuildResolvable, RawRoleData, Role, RoleData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getGuildRoles(client: Client, guildResolvable: GuildResolvable): Promise<RoleData[]> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");

    // Define fetch data
    const path: string = `/guilds/${guildID}/roles`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawRoleData[] = await fetchQueue.request({
        path,
        method
    });

    // Parse roles
    const roles: RoleData[] = result.map((r: RawRoleData) => Role._fromRawData(client, r, guildID));

    // Return
    return roles;
}