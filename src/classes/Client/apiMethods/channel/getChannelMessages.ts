import queryString from "query-string";
import { Channel, ChannelResolvable, Client, FetchQueue, Message } from "../../../../internal";
import getRoute from "../../../../util/getRoute";
import parseMessage from "../../events/parseMessage";
import { RawMessageData } from "../../events/rawMessageData";

export interface GetChannelMessagesData {
    limit?: number;
    before?: string;
    after?: string;
    around?: string;
}

export default async function getChannelMessages(client: Client, channelResolvable: ChannelResolvable, getChannelMessagesData: GetChannelMessagesData): Promise<Message[]> {

    // Resolve objects
    const channelID: string = Channel.resolveID(channelResolvable);

    // Define fetch data
    const path: string = `/channels/${channelID}/messages?${queryString.stringify({
        limit: getChannelMessagesData.limit,
        before: getChannelMessagesData.before,
        after: getChannelMessagesData.after,
        around: getChannelMessagesData.around
    })}`;
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
    const messages: Message[] = result.map((m: RawMessageData) => parseMessage(client, m));

    // Return
    return messages;
}