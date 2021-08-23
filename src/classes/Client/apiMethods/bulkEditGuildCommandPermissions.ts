import { Client, CommandPermissions, EditGuildCommandPermissions, FetchQueue, Guild, GuildResolvable, RawCommandPermissionsData, ResolvedCommandPermission } from "../../../internal";
import getRoute from "../../../util/getRoute";
import resolveRoleOrUserID from "../../../util/resolveRoleOrUserID";

export interface BulkEditGuildCommandPermissionsData {
    id: string;
    permissions: EditGuildCommandPermissions[];
}

interface BulkEditGuildResolvedCommandPermissions {
    id: string;
    permissions: ResolvedCommandPermission[];
}

export default async function bulkEditGuildCommandPermissions(client: Client, guildResolvable: GuildResolvable, bulkEditGuildCommandPermissionsData: BulkEditGuildCommandPermissionsData[]): Promise<CommandPermissions[]> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const permissions: BulkEditGuildResolvedCommandPermissions[] = bulkEditGuildCommandPermissionsData.map((p: BulkEditGuildCommandPermissionsData) => ({
        id: p.id,
        permissions: p.permissions.map((pp: EditGuildCommandPermissions) => ({
            id: resolveRoleOrUserID(pp.roleOrUser),
            type: pp.type,
            permission: pp.permission
        }))
    }));
    if (permissions.find((p: BulkEditGuildResolvedCommandPermissions) => p.permissions.find((pp: ResolvedCommandPermission) => !pp.id))) throw new Error("Invalid role or user resolvable in array of permissions");

    // Define fetch data
    const path: string = `/applications/${client.id}/guilds/${guildID}/commands/permissions`;
    const method: string = "PUT";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawCommandPermissionsData[] = await fetchQueue.request({
        path,
        method,
        data: permissions
    });

    // Parse commands permissions
    const commandPermissions: CommandPermissions[] = result.map((p: RawCommandPermissionsData) => CommandPermissions._fromRawData(client, p));

    // Return
    return commandPermissions;
}