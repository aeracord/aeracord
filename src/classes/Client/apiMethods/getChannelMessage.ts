import { Channel, ChannelResolvable, Client, FetchQueue, Message, MessageResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";
import parseMessage from "../events/parseMessage";
import { RawMessageData } from "../events/rawMessageData";

export default async function getChannelMessage(client: Client, channelResolvable: ChannelResolvable, messageResolvable: MessageResolvable): Promise<Message> {

    // Resolve objects
    const channelID: string = Channel.resolveID(channelResolvable);
    const messageID: string = Message.resolveID(messageResolvable);

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
    const message: Message = parseMessage(client, result);

    // Return
    return message;
}