import { Channel, ChannelResolvable, Client, FetchQueue, PermissionError, ThreadChannel, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function removeThreadMember(client: Client, channelResolvable: ChannelResolvable, userResolvable: UserResolvable, parentChannelResolvable?: ChannelResolvable): Promise<void> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const userID: string | undefined = User.resolveID(userResolvable);
    if (!userID) throw new Error("Invalid user resolvable");
    const parentChannelID: string | undefined | null = parentChannelResolvable ? Channel.resolveID(parentChannelResolvable) : null;
    if (parentChannelID === undefined) throw new Error("Invalid parent channel resolvable");

    // Missing permissions
    if ((client._cacheStrategies.permissions.enabled) && (parentChannelID)) {
        if ((!client.hasPermission("MANAGE_THREADS", parentChannelID)) && (!(channelResolvable instanceof ThreadChannel))) throw new PermissionError({ permission: "MANAGE_THREADS" });
        if (
            !client.hasPermission("MANAGE_THREADS", parentChannelID) &&
            channelResolvable instanceof ThreadChannel &&
            (
                !channelResolvable.private ||
                channelResolvable.creatorID !== client.id
            )
        ) throw new PermissionError({ permission: "MANAGE_THREADS" });
    }

    // Define fetch data
    const path: string = `/channels/${channelID}/thread-members/${userID}`;
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