import { Client, RateLimit } from "../../internal";
import processRequests from "./processRequests";
import request, { RequestOptions } from "./request";

/**
 * Fetch Queue Data
 *
 * Represents a `FetchQueue`
 */
export interface FetchQueueData {

    /**
     * Route
     *
     * The route for requests
     */
    route: string;
}

/**
 * Request
 *
 * A request in the fetch queue
 */
export interface Request {

    /**
     * Path
     *
     * The request's path
     */
    path: string;

    /**
     * Method
     *
     * The request's method
     */
    method: string;

    /**
     * Content Type
     *
     * The request's `Content-Type` header
     */
    contentType?: string;

    /**
     * Data
     *
     * The request's body
     */
    data?: object;

    /**
     * Audit Log Reason
     *
     * The request's `X-Audit-Log-Reason` header
     */
    auditLogReason?: string;

    /**
     * Resolve
     *
     * The method to resolve the promise
     */
    resolve: Function;

    /**
     * Reject
     *
     * The method to reject the promise
     */
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
        Object.defineProperty(this, "client", { value: client });
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
     * @param options.contentType The `Content-Type` header for the request
     * @param options.data The data for the request
     */
    request(options: RequestOptions): Promise<any> {
        return request(this, options);
    }

    /**
     * Process Requests
     *
     * Process the queued requests
     */
    processRequests() {
        processRequests(this);
    }
}