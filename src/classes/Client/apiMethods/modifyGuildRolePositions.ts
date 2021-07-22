import { Client, FetchQueue, Guild, GuildResolvable, PermissionError, RawRoleData, Role, RoleResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface ModifyGuildRolePositionsData {
    role: RoleResolvable;
    position: number;
}

interface PositionsData {
    id: string | undefined;
    position: number;
}

export default async function modifyGuildRolePositions(client: Client, guildResolvable: GuildResolvable, modifyGuildRolePositionsData: ModifyGuildRolePositionsData[]): Promise<Role[]> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const positions: PositionsData[] = modifyGuildRolePositionsData.map((p: ModifyGuildRolePositionsData) => ({
        id: Role.resolveID(p.role),
        position: p.position
    }));
    if (positions.find((p: PositionsData) => !p.id)) throw new Error("Invalid role resolvable in array of role positions");

    // Missing permissions
    if (!client.hasPermission("MANAGE_ROLES", guildID)) throw new PermissionError({ permission: "MANAGE_ROLES" });
    if (!client.canManageRoles(guildID, positions.map((p: PositionsData) => p.id) as string[])) throw new PermissionError({ role: positions.map((p: PositionsData) => p.id).join(",") });

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
        data: positions
    });

    // Parse roles
    const roles: Role[] = result.map((r: RawRoleData) => Role._fromRawData(client, r, guildID));

    // Return
    return roles;
}