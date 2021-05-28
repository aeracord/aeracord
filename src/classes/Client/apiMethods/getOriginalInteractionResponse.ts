import { APIError, Client, FetchQueue, Message, RawMessageData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getOriginalInteractionResponse(client: Client, interactionToken: string): Promise<Message | undefined> {

    // Define fetch data
    const path: string = `/webhooks/${client.id}/${interactionToken}/messages/@original`;
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
        if (err.code === 10008) unknownMessage = true;

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