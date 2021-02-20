import nodeFetch, { Response } from "node-fetch";
import { Client, FetchQueue } from "../../internal";
import getRoute from "../../util/getRoute";

// Typescript complains about the file not being in the root directory (`src/`) if you use `import`
const packageJSON = require("../../../package.json");

export interface RequestOptions {
    path: string;
    method: string;
    body?: object;
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
            "Content-Type": requestOptions.method === "DELETE" ? undefined : "application/json",
            "X-RateLimit-Precision": "millisecond"
        } as any,
        method: requestOptions.method,
        body: requestOptions.body && JSON.stringify(requestOptions.body)
    });

    // Parse result
    let data: any = result.headers.get("Content-Type") === "application/json" ? await result.json() : undefined;

    // Get rate limit
    const limit: number = parseInt(result.headers.get("X-RateLimit-Limit") || "") || 0;
    const remaining: number = parseInt(result.headers.get("X-RateLimit-Remaining") || "") || 0;
    const reset: number = (parseFloat(result.headers.get("X-RateLimit-Reset") || "") * 1000) || 0;

    // Set rate limit
    if (limit) fetchQueue.rateLimit = {
        limit,
        remaining,
        reset
    };

    // API error
    if ((data) && (data.code !== undefined)) throw new Error(`Discord API error at ${requestOptions.method} ${requestOptions.path}: ${JSON.stringify(data, null, 4)}`);

    // Return
    return {
        data,
        rateLimited: result.status === 429
    };
}