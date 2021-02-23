import { Channel, ChannelResolvable, Client, FetchQueue, Message, MessageResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface BulkDeleteMessagesData {
    messages: MessageResolvable[];
}

export default async function bulkDeleteMessages(client: Client, channelResolvable: ChannelResolvable, bulkDeleteMessagesData: BulkDeleteMessagesData): Promise<void> {

    // Resolve objects
    const channelID: string = Channel.resolveID(channelResolvable);
    bulkDeleteMessagesData.messages = bulkDeleteMessagesData.messages.map((m: MessageResolvable) => Message.resolveID(m));

    // Define fetch data
    const path: string = `/channels/${channelID}/messages/bulk-delete`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    await fetchQueue.request({
        path,
        method,
        data: {
            messages: bulkDeleteMessagesData.messages
        }
    });
}