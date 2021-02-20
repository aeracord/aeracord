import { Client, FetchQueue } from "../../internal";

export default function getFetchQueue(client: Client, route: string): FetchQueue {

    // Get fetch queue
    let fetchQueue: FetchQueue | undefined = client._fetchQueues.get(route);

    // No fetch queue
    if (!fetchQueue) {

        // Create a fetch queue
        fetchQueue = new FetchQueue(client, {
            route
        });

        // Set fetch queue
        client._fetchQueues.set(route, fetchQueue);
    }

    // Return
    return fetchQueue;
}