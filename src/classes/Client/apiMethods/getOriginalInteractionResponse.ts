import { Client, FetchQueue, Message, RawMessageData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getOriginalInteractionResponse(client: Client, interactionToken: string): Promise<Message> {

    // Define fetch data
    const path: string = `/webhooks/${client.id}/${interactionToken}/messages/@original`;
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