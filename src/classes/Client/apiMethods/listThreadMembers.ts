import { Channel, ChannelResolvable, Client, FetchQueue, RawThreadMemberData, ThreadCacheData, ThreadMember } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function listThreadMembers(client: Client, channelResolvable: ChannelResolvable): Promise<ThreadMember[]> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");

    // Get thread cache data
    const threadCacheData: ThreadCacheData | undefined = client._threadChannels.get(channelID);
    if (!threadCacheData) throw new Error("Unknown thread channel");

    // Define fetch data
    const path: string = `/channels/${channelID}/thread-members`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawThreadMemberData[] = await fetchQueue.request({
        path,
        method
    });

    // Parse thread members
    const threadMembers: ThreadMember[] = result.map((m: RawThreadMemberData) => ThreadMember._fromRawData(client, m, threadCacheData.guildID));

    // Return
    return threadMembers;
}