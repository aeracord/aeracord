import { FetchQueue, Request } from "../../internal";

export default async function processRequests(fetchQueue: FetchQueue) {

    // Define sleep function
    const sleep = (amount: number) => new Promise((resolve) => setTimeout(resolve, amount));

    // Set processing requests
    fetchQueue.processingRequests = true;

    // Loop through the queue until it's empty
    while (fetchQueue.queue.length > 0) {

        // Get request
        const request: Request | undefined = fetchQueue.queue.shift();
        if (!request) break;

        // Await rate limit
        if ((fetchQueue.rateLimit) && (fetchQueue.rateLimit.remaining === 0)) await sleep(fetchQueue.rateLimit.reset - Date.now());

        // Fetch
        const result = await fetchQueue.client.fetch({
            path: request.path,
            method: request.method,
            body: request.data
        }).catch((err: Error) => request.reject(err));

        // Resolve
        request.resolve(result);
    }

    // Set processing requests
    fetchQueue.processingRequests = false;
}