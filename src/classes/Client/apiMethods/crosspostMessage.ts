import { Channel, ChannelResolvable, Client, FetchQueue, Message, MessageResolvable, RawMessageData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function crosspostMessage(client: Client, channelResolvable: ChannelResolvable, messageResolvable: MessageResolvable): Promise<Message> {

    // Resolve objects
    const channelID: string = Channel.resolveID(channelResolvable);
    const messageID: string = Message.resolveID(messageResolvable);

    // Define fetch data
    const path: string = `/channels/${channelID}/messages/${messageID}/crosspost`;
    const method: string = "POST";
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