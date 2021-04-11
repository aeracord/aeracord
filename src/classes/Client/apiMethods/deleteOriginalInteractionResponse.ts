import { Client, FetchQueue } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function deleteOriginalInteractionResponse(client: Client, interactionToken: string): Promise<void> {

    // Define fetch data
    const path: string = `/webhooks/${client.id}/${interactionToken}/messages/@original`;
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