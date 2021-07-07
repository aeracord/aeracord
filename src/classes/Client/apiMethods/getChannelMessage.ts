import { APIError, Channel, ChannelResolvable, Client, FetchQueue, Message, MessageResolvable, PermissionError, RawMessageData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getChannelMessage(client: Client, channelResolvable: ChannelResolvable, messageResolvable: MessageResolvable): Promise<Message | undefined> {

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
    let unknownMessage: boolean = false;
    const result: RawMessageData = await fetchQueue.request({
        path,
        method
    }).catch((err: APIError) => {

        // Unknown message
        if (
            err.code === 10008 ||
            err.errors?.channel_id?._errors?.[0]?.code === "NUMBER_TYPE_COERCE" ||
            err.errors?.message_id?._errors?.[0]?.code === "NUMBER_TYPE_COERCE"
        ) unknownMessage = true;

        // Throw error
        else throw err;
    });

    // Unknown message
    if (unknownMessage) return;

    // Parse message
    const message: Message = Message._fromRawData(client, result);

    // Return
    return message;
}