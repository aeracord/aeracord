import { Channel, ChannelPermissionData, ChannelResolvable, Client, FetchQueue, Permissions, PermissionOverwrite, RoleResolvable, UserResolvable, PermissionError } from "../../../internal";
import getRoute from "../../../util/getRoute";
import resolveRoleOrUserID from "../../../util/resolveRoleOrUserID";

export default async function deleteChannelPermission(client: Client, channelResolvable: ChannelResolvable, roleOrUserResolvable: RoleResolvable | UserResolvable): Promise<void> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const roleOrUserID: string | undefined = resolveRoleOrUserID(roleOrUserResolvable);
    if (!roleOrUserID) throw new Error("Invalid role or user resolvable");

    // Get channel permission data
    const channelPermissionData: ChannelPermissionData = client._channelPermissions.get(channelID) as ChannelPermissionData;
    const permissionOverwrite: PermissionOverwrite | undefined = channelPermissionData.permissionOverwrites.find((p: PermissionOverwrite) => p.id === roleOrUserID);

    // Missing permissions
    if (!client.hasPermission(
        permissionOverwrite ?
            ["MANAGE_ROLES", ...(new Permissions(permissionOverwrite.allow).getAll()), ...(new Permissions(permissionOverwrite.deny).getAll())] :
            ["MANAGE_ROLES"],
        channelID
    )) throw new PermissionError({ permission: "MANAGE_ROLES" });

    // Define fetch data
    const path: string = `/channels/${channelID}/permissions/${roleOrUserID}`;
    const method: string = "DELETE";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    await fetchQueue.request({
        path,
        method
    });
}