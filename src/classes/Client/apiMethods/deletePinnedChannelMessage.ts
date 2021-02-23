import { Channel, ChannelResolvable, Client, FetchQueue, Message, MessageResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function deletePinnedChannelMessage(client: Client, channelResolvable: ChannelResolvable, messageResolvable: MessageResolvable): Promise<void> {

    // Resolve objects
    const channelID: string = Channel.resolveID(channelResolvable);
    const messageID: string = Message.resolveID(messageResolvable);

    // Define fetch data
    const path: string = `/channels/${channelID}/pins/${messageID}`;
    const method: string = "DELETE";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    await fetchQueue.request({
        path,
        method
    });
}