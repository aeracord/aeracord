import { Client, FetchQueue, Message } from "../../../../internal";
import getRoute from "../../../../util/getRoute";
import parseMessage from "../../events/parseMessage";
import { RawMessageData } from "../../events/rawMessageData";

export default async function crosspostMessage(client: Client, channelID: string, messageID: string): Promise<Message> {

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
    const message: Message = parseMessage(client, result);

    // Return
    return message;
}