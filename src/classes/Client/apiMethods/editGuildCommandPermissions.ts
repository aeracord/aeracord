import { Client, Command, CommandPermissions, CommandPermissionType, CommandResolvable, FetchQueue, Guild, GuildResolvable, RawCommandPermissionsData, RoleResolvable, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";
import resolveRoleOrUserID from "../../../util/resolveRoleOrUserID";

export interface EditGuildCommandPermissionsData {
    permissions: EditGuildCommandPermissions[];
}

export interface EditGuildCommandPermissions {
    roleOrUser: RoleResolvable | UserResolvable;
    type: CommandPermissionType;
    permission: boolean;
}

export interface ResolvedCommandPermission {
    id?: string;
    type: CommandPermissionType;
    permission: boolean;
}

export default async function editGuildCommandPermissions(client: Client, guildResolvable: GuildResolvable, commandResolvable: CommandResolvable, editGuildCommandPermissionsData: EditGuildCommandPermissionsData): Promise<CommandPermissions> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const commandID: string | undefined = Command.resolveID(commandResolvable);
    if (!commandID) throw new Error("Invalid command resolvable");
    const permissions: ResolvedCommandPermission[] = editGuildCommandPermissionsData.permissions.map((p: EditGuildCommandPermissions) => ({
        id: resolveRoleOrUserID(p.roleOrUser),
        type: p.type,
        permission: p.permission
    }));
    if (permissions.find((p: ResolvedCommandPermission) => !p.id)) throw new Error("Invalid role or user resolvable in array of permissions");

    // Define fetch data
    const path: string = `/applications/${client.id}/guilds/${guildID}/commands/${commandID}/permissions`;
    const method: string = "PUT";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawCommandPermissionsData = await fetchQueue.request({
        path,
        method,
        data: {
            permissions
        }
    });

    // Parse command permissions
    const commandPermissions: CommandPermissions = CommandPermissions._fromRawData(client, result);

    // Return
    return commandPermissions;
}