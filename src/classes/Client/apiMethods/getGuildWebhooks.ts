import { Client, FetchQueue, Guild, GuildResolvable, RawWebhookData, Webhook, WebhookData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getGuildWebhooks(client: Client, guildResolvable: GuildResolvable): Promise<WebhookData[]> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");

    // Define fetch data
    const path: string = `/guilds/${guildID}/webhooks`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawWebhookData[] = await fetchQueue.request({
        path,
        method
    });

    // Parse webhooks
    const webhooks: WebhookData[] = result.map((w: RawWebhookData) => Webhook._fromRawData(w));

    // Return
    return webhooks;
}