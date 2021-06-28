import { Channel, ChannelResolvable, Client, FetchQueue, RawChannelData, StartThreadData, ThreadChannel } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function startPrivateThread(client: Client, channelResolvable: ChannelResolvable, startThreadData: StartThreadData): Promise<ThreadChannel> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");

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