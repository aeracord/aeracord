import { Channel, ChannelResolvable, ChannelTypes, Client, FetchQueue, PermissionError, ThreadCacheData, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function removeThreadMember(client: Client, channelResolvable: ChannelResolvable, userResolvable: UserResolvable): Promise<void> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const userID: string | undefined = User.resolveID(userResolvable);
    if (!userID) throw new Error("Invalid user resolvable");

    // Get the thread cache data
    const threadCacheData: ThreadCacheData | undefined = client._threadChannels.get(channelID);
    if (!threadCacheData) throw new PermissionError({ permission: "VIEW_CHANNEL" });

    /**
     * You need the manage threads permission to remove members
     * unless youre the creator of a private thread
     */
    if (
        !client.hasPermission("MANAGE_THREADS", channelID) &&
        (
            threadCacheData.type !== ChannelTypes.PRIVATE_THREAD ||
            !threadCacheData.createdByClient
        )
    ) throw new PermissionError({ permission: "MANAGE_THREADS" });

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