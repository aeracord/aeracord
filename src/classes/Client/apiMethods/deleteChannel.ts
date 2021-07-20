import { AnyChannel, Channel, ChannelResolvable, Client, FetchQueue, PermissionError, RawChannelData, ThreadCacheData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function deleteChannel(client: Client, channelResolvable: ChannelResolvable, reason?: string): Promise<AnyChannel> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");

    // Missing permissions
    if (client._cacheStrategies.permissions.enabled) {

        // Get the thread cache data
        const threadCacheData: ThreadCacheData | undefined = client._threadChannels?.get(channelID);

        if ((threadCacheData) && (!client.hasPermission("MANAGE_THREADS", channelID))) throw new PermissionError({ permission: "MANAGE_THREADS" });
        else if ((!threadCacheData) && (!client.hasPermission("MANAGE_CHANNELS", channelID))) throw new PermissionError({ permission: "MANAGE_CHANNELS" });
    }

    // Define fetch data
    const path: string = `/channels/${channelID}`;
    const method: string = "DELETE";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawChannelData = await fetchQueue.request({
        path,
        method,
        auditLogReason: reason
    });

    // Parse channel
    const channel: AnyChannel = Channel._fromRawData(client, result);

    // Return
    return channel;
}