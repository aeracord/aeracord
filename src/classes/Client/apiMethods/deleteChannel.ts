import { AnyChannel, Channel, ChannelResolvable, Client, FetchQueue, RawChannelData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function deleteChannel(client: Client, channelResolvable: ChannelResolvable): Promise<AnyChannel> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");

    // Define fetch data
    const path: string = `/channels/${channelID}`;
    const method: string = "DELETE";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawChannelData = await fetchQueue.request({
        path,
        method
    });

    // Parse channel
    const channel: AnyChannel = Channel._fromRawData(client, result);

    // Return
    return channel;
}