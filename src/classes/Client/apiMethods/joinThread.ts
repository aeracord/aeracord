import { Channel, ChannelResolvable, ChannelTypes, Client, FetchQueue, ThreadCacheData } from "../../../internal";
import getRoute from "../../../util/getRoute";
import PermissionError from "../../PermissionError/PermissionError";

export default async function joinThread(client: Client, channelResolvable: ChannelResolvable): Promise<void> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");

    // Get the thread cache data
    const threadCacheData: ThreadCacheData | undefined = client._threadChannels.get(channelID);
    if (!threadCacheData) throw new PermissionError({ permission: "VIEW_CHANNEL" });

    // You need the manage threads permission to join a private thread
    if ((threadCacheData.type === ChannelTypes.PRIVATE_THREAD) && (!client.hasPermission("MANAGE_THREADS", channelID))) throw new PermissionError({ permission: "MANAGE_THREADS" });

    // Define fetch data
    const path: string = `/channels/${channelID}/thread-members/@me`;
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