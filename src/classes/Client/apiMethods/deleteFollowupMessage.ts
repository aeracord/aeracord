import { Client, FetchQueue, Message, MessageResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function deleteFollowupMessage(client: Client, interactionToken: string, messageResolvable: MessageResolvable): Promise<void> {

    // Resolve objects
    const messageID: string | undefined = Message.resolveID(messageResolvable);
    if (!messageID) throw new Error("Invalid message resolvable");

    // Define fetch data
    const path: string = `/webhooks/${client.id}/${interactionToken}/messages/${messageID}`;
    const method: string = "DELETE";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    await fetchQueue.request({
        path,
        method
    });
}