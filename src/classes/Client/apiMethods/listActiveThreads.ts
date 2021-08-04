import { Channel, Client, FetchQueue, Guild, GuildResolvable, RawChannelData, RawThreadMemberData, ThreadChannel } from "../../../internal";
import getRoute from "../../../util/getRoute";

interface RawThreadListData {
    threads: RawChannelData[];
    members: RawThreadMemberData[];
}

export default async function listActiveThreads(client: Client, guildResolvable: GuildResolvable): Promise<ThreadChannel[]> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");

    // Define fetch data
    const path: string = `/guilds/${guildID}/threads/active`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawThreadListData = await fetchQueue.request({
        path,
        method
    });

    // Parse threads
    const threads: ThreadChannel[] = result.threads.map((c: RawChannelData) => Channel._fromRawData(client, {
        ...c,
        member: result.members.find((m: RawThreadMemberData) => m.id === c.id)
    }) as ThreadChannel);

    // Return
    return threads;
}