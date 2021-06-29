import { Channel, ChannelResolvable, Client, FetchQueue, RawChannelData, StartThreadData, ThreadChannel } from "../../../internal";
import getRoute from "../../../util/getRoute";
import PermissionError from "../../PermissionError/PermissionError";

export default async function startPrivateThread(client: Client, channelResolvable: ChannelResolvable, startThreadData: StartThreadData): Promise<ThreadChannel> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");

    // Missing permissions
    if (client._cacheStrategies.permissions.enabled) {
        if (!client.hasPermission("SEND_MESSAGES", channelID)) throw new PermissionError({ permission: "SEND_MESSAGES" });
        if (!client.hasPermission("USE_PRIVATE_THREADS", channelID)) throw new PermissionError({ permission: "USE_PRIVATE_THREADS" });
    }

    // Define fetch data
    const path: string = `/channels/${channelID}/threads`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawChannelData = await fetchQueue.request({
        path,
        method,
        data: {
            name: startThreadData.name,
            auto_archive_duration: startThreadData.autoArchiveDuration
        }
    });

    // Parse thread channel
    const threadChannel: ThreadChannel = Channel._fromRawData(client, result) as ThreadChannel;

    // Return
    return threadChannel;
}