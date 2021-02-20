import { AnyChannel, Client, FetchQueue } from "../../../../internal";
import getRoute from "../../../../util/getRoute";
import parseChannel from "../../events/parseChannel";
import { RawChannelData } from "../../events/rawChannelData";

export default async function getChannel(client: Client, channelID: string): Promise<AnyChannel> {

    // Define fetch data
    const path: string = `/channels/${channelID}`;
    const method: string = "GET";
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