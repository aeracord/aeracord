import { Channel, ChannelResolvable, Client, FetchQueue, PermissionType, Role, RoleResolvable, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface EditChannelPermissionsData {
    type: PermissionType;
    allow: string;
    deny: string;
}

export default async function editChannelPermissions(client: Client, channelResolvable: ChannelResolvable, roleOrUserResolvable: RoleResolvable | UserResolvable, editChannelPermissionsData: EditChannelPermissionsData): Promise<void> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const roleOrUserID: string | undefined = roleOrUserResolvable instanceof Role ? Role.resolveID(roleOrUserResolvable) : User.resolveID(roleOrUserResolvable);
    if (!roleOrUserID) throw new Error("Invalid role or user resolvable");

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