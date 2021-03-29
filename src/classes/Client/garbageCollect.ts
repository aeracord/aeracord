import { Client } from "../../internal";

export default function garbageCollect(client: Client) {

    // Loop through fetch queues
    for (let fetchQueue of client._fetchQueues.values()) {

        // Remove fetch queue
        if (

            // Not processing requests
            !fetchQueue.processingRequests &&

            // Rate limit expired
            (

                // No rate limit
                !fetchQueue.rateLimit ||

                // Rate limit expired
                fetchQueue.rateLimit.reset - Date.now() <= 0
            )
        ) client._fetchQueues.delete(fetchQueue.route);
    }
}