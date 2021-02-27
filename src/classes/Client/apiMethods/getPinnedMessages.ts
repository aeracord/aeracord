import { Channel, ChannelResolvable, Client, FetchQueue, Message, RawMessageData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getPinnedMessages(client: Client, channelResolvable: ChannelResolvable): Promise<Message[]> {

    // Resolve objects
    const channelID: string = Channel.resolveID(channelResolvable);

    // Define fetch data
    const path: string = `/channels/${channelID}/pins`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawMessageData[] = await fetchQueue.request({
        path,
        method
    });

    // Parse messages
    const messages: Message[] = result.map((m: RawMessageData) => Message._fromRawData(client, m));

    // Return
    return messages;
}