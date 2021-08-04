import queryString from "query-string";
import { Channel, ChannelResolvable, Client, FetchQueue, PermissionError, RawChannelData, RawThreadMemberData, ThreadChannel } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface ListArchivedThreadsData {
    before?: string;
    limit?: number;
}

export interface ArchivedThreadListData {
    threads: ThreadChannel[];
    hasMore: boolean;
}

export interface RawArchivedThreadListData {
    threads: RawChannelData[];
    members: RawThreadMemberData[];
    has_more: boolean;
}

export default async function listPublicArchivedThreads(client: Client, channelResolvable: ChannelResolvable, listArchivedThreadsData: ListArchivedThreadsData = {}): Promise<ArchivedThreadListData> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");

    // Missing permissions
    if (!client.hasPermission("READ_MESSAGE_HISTORY", channelID)) throw new PermissionError({ permission: "READ_MESSAGE_HISTORY" });

    // Define fetch data
    const path: string = `/channels/${channelID}/threads/archived/public?${queryString.stringify({
        before: listArchivedThreadsData.before,
        limit: listArchivedThreadsData.limit
    })}`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawArchivedThreadListData = await fetchQueue.request({
        path,
        method
    });

    // Parse threads
    const threads: ThreadChannel[] = result.threads.map((c: RawChannelData) => Channel._fromRawData(client, {
        ...c,
        member: result.members.find((m: RawThreadMemberData) => m.id === c.id)
    }) as ThreadChannel);

    // Return
    return {
        threads,
        hasMore: result.has_more
    };
}