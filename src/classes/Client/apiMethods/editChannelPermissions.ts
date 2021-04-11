import { Channel, ChannelResolvable, Client, FetchQueue, PermissionType, RoleResolvable, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";
import resolveRoleOrUserID from "../../../util/resolveRoleOrUserID";

export interface EditChannelPermissionsData {
    type: PermissionType;
    allow: string;
    deny: string;
}

export default async function editChannelPermissions(client: Client, channelResolvable: ChannelResolvable, roleOrUserResolvable: RoleResolvable | UserResolvable, editChannelPermissionsData: EditChannelPermissionsData): Promise<void> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const roleOrUserID: string | undefined = resolveRoleOrUserID(roleOrUserResolvable);
    if (!roleOrUserID) throw new Error("Invalid role or user resolvable");

    // Missing permissions
    if ((client._cacheStrategies.permissions.enabled) && (!client.hasPermission("MANAGE_ROLES", channelID))) throw new Error("Missing manage roles permissions");

    // Define fetch data
    const path: string = `/channels/${channelID}/permissions/${roleOrUserID}`;
    const method: string = "PUT";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    await fetchQueue.request({
        path,
        method,
        data: {
            type: editChannelPermissionsData.type,
            allow: editChannelPermissionsData.allow,
            deny: editChannelPermissionsData.deny
        }
    });
}