import { Client, FetchQueue, Guild, GuildResolvable, Role } from "../../../internal";
import getRoute from "../../../util/getRoute";
import parseRole from "../events/parseRole";
import { RawRoleData } from "../events/rawRoleData";

export default async function getGuildRoles(client: Client, guildResolvable: GuildResolvable): Promise<Role[]> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);

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
    const roles: Role[] = result.map((r: RawRoleData) => parseRole(client, r, guildID));

    // Return
    return roles;
}