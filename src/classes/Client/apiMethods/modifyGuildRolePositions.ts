import { Client, FetchQueue, Guild, GuildResolvable, Role } from "../../../internal";
import getRoute from "../../../util/getRoute";
import parseRole from "../events/parseRole";
import { RawRoleData } from "../events/rawRoleData";

export interface ModifyGuildRolePositionsData {
    id: string;
    position: number;
}

export default async function modifyGuildRolePositions(client: Client, guildResolvable: GuildResolvable, modifyGuildRolePositionsData: ModifyGuildRolePositionsData[]): Promise<Role[]> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);

    // Define fetch data
    const path: string = `/guilds/${guildID}/roles`;
    const method: string = "PATCH";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawRoleData[] = await fetchQueue.request({
        path,
        method,
        data: modifyGuildRolePositionsData
    });

    // Parse roles
    const roles: Role[] = result.map((r: RawRoleData) => parseRole(client, r, guildID));

    // Return
    return roles;
}