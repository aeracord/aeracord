import { Client, RateLimit } from "../../internal";
import processRequests from "./processRequests";
import request, { RequestOptions } from "./request";

export interface FetchQueueData {
    route: string;
}

export interface Request {
    path: string;
    method: string;
    data?: object;
    resolve: Function;
    reject: Function;
}

export default class FetchQueue {

    /**
     * Client
     *
     * The client
     */
    client: Client;

    /**
     * Route
     *
     * The route for requests
     */
    route: string;

    /**
     * Queue
     *
     * The queued requests
     */
    queue: Request[];

    /**
     * Rate Limit
     *
     * The rate limit for this endpoint
     */
    rateLimit?: RateLimit;

    /**
     * Processing Requests
     *
     * Whether or not requests are being processed
     */
    processingRequests: boolean;

    /**
     * Fetch Queue
     *
     * @param client The client
     * @param fetchQueueData Options to initialize this fetch queue with
     * @param fetchQueueData.route The route for requests
     */
    constructor(client: Client, fetchQueueData: FetchQueueData) {

        // Set data
        this.client = client;
        this.route = fetchQueueData.route;
        this.queue = [];
        this.processingRequests = false;
    }

    /**
     * Request
     *
     * Make a request
     *
     * @param options The options for the request
     * @param options.path The path for the request
     * @param options.method The method for the request
     * @param options.data The data for the request
     */
    request = (options: RequestOptions): Promise<any> => request(this, options);

    /**
     * Process Requests
     *
     * Process the queued requests
     */
    processRequests = () => processRequests(this);
}