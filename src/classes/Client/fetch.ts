import FormData from "form-data";
import nodeFetch, { Response } from "node-fetch";
import { Client, FetchQueue } from "../../internal";
import getRoute from "../../util/getRoute";

// Typescript complains about the file not being in the root directory (`src/`) if you use `import`
const packageJSON = require("../../../package.json");

export interface RequestOptions {
    path: string;
    method: string;
    contentType?: string;
    body?: object | FormData;
    auditLogReason?: string;
}

export interface FetchedData {
    data?: any;
    rateLimited: boolean;
}

export interface RateLimit {
    limit: number;
    remaining: number;
    reset: number;
}

export default async function fetch(client: Client, requestOptions: RequestOptions): Promise<FetchedData> {

    // Get route
    const route: string = getRoute(requestOptions.path, requestOptions.method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Make request
    const result: Response = await nodeFetch(`https://discord.com/api/v8${requestOptions.path}`, {
        headers: {
            "User-Agent": `Aeracord (https://aeracord.apixel.me, ${packageJSON.version})`,
            "Authorization": `Bot ${client.token}`,
            "Content-Type": requestOptions.contentType || (requestOptions.method === "DELETE" ? undefined : "application/json"),
            "X-RateLimit-Precision": "millisecond",
            "X-Audit-Log-Reason": requestOptions.auditLogReason
        } as any,
        method: requestOptions.method,
        body: requestOptions.body && (requestOptions.body instanceof FormData ? requestOptions.body : JSON.stringify(requestOptions.body))
    });

    // Parse result
    let data: any = result.headers.get("Content-Type") === "application/json" ? await result.json() : undefined;

    // Get rate limit
    const global: boolean = result.headers.get("X-RateLimit-Global") === "true";
    const limit: number = parseInt(result.headers.get("X-RateLimit-Limit") || "") || 0;
    const remaining: number = parseInt(result.headers.get("X-RateLimit-Remaining") || "") || 0;
    const reset: number = (parseFloat(result.headers.get("X-RateLimit-Reset") || "") * 1000) || 0;
    const retryAfter: number = (parseInt(result.headers.get("Retry-After") || "") * 1000) || 0;

    // Set global rate limit
    if (global) client._globalRateLimitReset = new Promise((resolve) => setTimeout(() => {

        // Resolve promise
        resolve();

        // Remove global rate limit reset
        delete client._globalRateLimitReset;
    }, retryAfter));

    // Set rate limit
    else if (limit) fetchQueue.rateLimit = {
        limit,
        remaining,
        reset
    };

    // API error
    if ((data) && (typeof data.code === "number")) throw new Error(`Discord API error at ${requestOptions.method} ${requestOptions.path}: ${JSON.stringify(data, null, 4)}`);

    // Return
    return {
        data,
        rateLimited: result.status === 429
    };
}