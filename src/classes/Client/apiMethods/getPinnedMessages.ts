import { Channel, ChannelResolvable, Client, FetchQueue, Message, PermissionError, RawMessageData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getPinnedMessages(client: Client, channelResolvable: ChannelResolvable): Promise<Message[]> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");

    // Missing permissions
    if ((client._cacheStrategies.permissions.enabled) && (!client.hasPermission("VIEW_CHANNEL", channelID))) throw new PermissionError({ permission: "VIEW_CHANNEL" });

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