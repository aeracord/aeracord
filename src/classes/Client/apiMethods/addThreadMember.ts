import { Channel, ChannelResolvable, ChannelTypes, Client, FetchQueue, PermissionError, ThreadCacheData, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function addThreadMember(client: Client, channelResolvable: ChannelResolvable, userResolvable: UserResolvable): Promise<void> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const userID: string | undefined = User.resolveID(userResolvable);
    if (!userID) throw new Error("Invalid user resolvable");

    // Get the thread cache data
    const threadCacheData: ThreadCacheData | undefined = client._threadChannels.get(channelID);
    if (!threadCacheData) throw new PermissionError({ permission: "VIEW_CHANNEL" });

    // Missing permissions
    if (!client.hasPermission("SEND_MESSAGES", channelID)) throw new PermissionError({ permission: "SEND_MESSAGES" });

    // You need the use public/private threads permission to add members to a thread
    if ((threadCacheData.type === ChannelTypes.PRIVATE_THREAD) && (!client.hasPermission("USE_PRIVATE_THREADS", channelID))) throw new PermissionError({ permission: "USE_PRIVATE_THREADS" });
    else if ((threadCacheData.type !== ChannelTypes.PRIVATE_THREAD) && (!client.hasPermission("USE_PUBLIC_THREADS", channelID))) throw new PermissionError({ permission: "USE_PUBLIC_THREADS" });

    // Define fetch data
    const path: string = `/channels/${channelID}/thread-members/${userID}`;
    const method: string = "PUT";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    await fetchQueue.request({
        path,
        method
    });
}