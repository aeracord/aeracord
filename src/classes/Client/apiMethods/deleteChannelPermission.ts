import { Channel, ChannelResolvable, Client, FetchQueue, Role, RoleResolvable, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function deleteChannelPermission(client: Client, channelResolvable: ChannelResolvable, roleOrUserResolvable: RoleResolvable | UserResolvable): Promise<void> {

    // Resolve objects
    const channelID: string = Channel.resolveID(channelResolvable);
    const roleOrUserID: string = roleOrUserResolvable instanceof Role ? Role.resolveID(roleOrUserResolvable) : User.resolveID(roleOrUserResolvable);

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