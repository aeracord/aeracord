import { Channel, ChannelResolvable, Client, FetchQueue, Message, MessageResolvable, PermissionError, RawMessageData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getChannelMessage(client: Client, channelResolvable: ChannelResolvable, messageResolvable: MessageResolvable): Promise<Message> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const messageID: string | undefined = Message.resolveID(messageResolvable);
    if (!messageID) throw new Error("Invalid message resolvable");

    // Missing permissions
    if ((client._cacheStrategies.permissions.enabled) && (!client.hasPermission("READ_MESSAGE_HISTORY", channelID))) throw new PermissionError({ permission: "READ_MESSAGE_HISTORY" });

    // Define fetch data
    const path: string = `/channels/${channelID}/messages/${messageID}`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawMessageData = await fetchQueue.request({
        path,
        method
    });

    // Parse message
    const message: Message = Message._fromRawData(client, result);

    // Return
    return message;
}