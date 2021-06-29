import { Channel, ChannelResolvable, Client, FetchQueue } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function joinThread(client: Client, channelResolvable: ChannelResolvable): Promise<void> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");

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