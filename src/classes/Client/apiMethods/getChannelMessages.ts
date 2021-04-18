import queryString from "query-string";
import { Channel, ChannelResolvable, Client, FetchQueue, Message, RawMessageData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface GetChannelMessagesData {
    limit?: number;
    before?: string;
    after?: string;
    around?: string;
}

export default async function getChannelMessages(client: Client, channelResolvable: ChannelResolvable, getChannelMessagesData: GetChannelMessagesData = {}): Promise<Message[]> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");

    // Missing permissions
    if ((client._cacheStrategies.permissions.enabled) && (!client.hasPermission("READ_MESSAGE_HISTORY", channelID))) throw new Error("Missing read message history permissions");

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
    const messages: Message[] = result.map((m: RawMessageData) => Message._fromRawData(client, m));

    // Return
    return messages;
}