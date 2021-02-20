/**
 * Get Route
 *
 * Since rate limits (https://discord.com/developers/docs/topics/rate-limits) are grouped by routes,
 * this method converts an API path to a route
 *
 * Modified from https://github.com/abalabahaha/eris/blob/72859c9aaf8e7349e06879f2266c8b6885de4720/lib/rest/RequestHandler.js#L359
 *
 * @param path The API path
 * @param method The request method
 *
 * @returns {string} The route
 */
export default function getRoute(path: string, method: string): string {

    // Parse route
    let route: string = path

        /**
         * Replaces IDs for non-major parameters with ":id"
         * Major parameters are channel, guild, and webhook IDs
         *
         * For example, the non-major parameter in `/channels/{channelID}/messages/{messageID}` would be the message ID
         * So it would be replaced with ":id" (`/channels/{channelID}/messages/:id`)
         */
        .replace(/\/([a-z-]+)\/([0-9]{17,})/g, (match: string, type: string, id: string) => `/${type}/${["channels", "guilds", "webhooks"].includes(type) ? id : ":id"}`)

        /**
         * Replaces emojis for reaction parameters with ":id"
         *
         * The previous `.replace()` replaces IDs, but reaction emoji parameters are in the format `name:id` instead of just the ID
         */
        .replace(/\/reactions\/[^/]+/g, "/reactions/:id")

        /**
         * Replaces webhook tokens with ":token"
         *
         * For example, the non-major parameter in `/webhooks/{webhookID}/{token}` would be the token
         * So it would be replaced with ":id" (`/webhooks/{webhookID}/:token`)
         */
        .replace(/^\/webhooks\/([0-9]+)\/[A-Za-z0-9-_]{64,}/g, (match: string, id: string) => `/webhooks/${id}/:token`);

    // Parse route for deleting messages since it has a separate rate limit
    if ((method === "DELETE") && (route.endsWith("/messages/:id"))) route = `DELETE${route}`;

    // Return
    return route;
}