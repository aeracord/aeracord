import { AnyChannel, Channel, ChannelResolvable, Client, FetchQueue } from "../../../../internal";
import getRoute from "../../../../util/getRoute";
import parseChannel from "../../events/parseChannel";
import { RawChannelData } from "../../events/rawChannelData";

export default async function deleteChannel(client: Client, channelResolvable: ChannelResolvable): Promise<AnyChannel> {

    // Resolve objects
    const channelID: string = Channel.resolveID(channelResolvable);

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
    const channel: AnyChannel = parseChannel(client, result);

    // Return
    return channel;
}