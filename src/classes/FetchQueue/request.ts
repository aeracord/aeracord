import FormData from "form-data";
import { FetchQueue } from "../../internal";

export interface RequestOptions {
    path: string;
    method: string;
    contentType?: string;
    data?: object | FormData;
}

export default function request(fetchQueue: FetchQueue, options: RequestOptions): Promise<any> {
    return new Promise((resolve, reject) => {

        // Add request to queue
        fetchQueue.queue.push({
            path: options.path,
            method: options.method,
            contentType: options.contentType,
            data: options.data,
            resolve,
            reject
        });

        /**
         * Process requests
         *
         * If the requests aren't already being processed, start processing them
         *
         * If they're already being processed, we don't need to call `FetchQueue.processRequests()` again
         * Once processing starts, it only stops once the queue is empty
         */
        if (!fetchQueue.processingRequests) fetchQueue.processRequests();
    });
}