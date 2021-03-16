import { Client, FetchQueue, RawWebhookData, Webhook, WebhookData, WebhookResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getWebhook(client: Client, webhookResolvable: WebhookResolvable): Promise<WebhookData> {

    // Resolve objects
    const webhookID: string | undefined = Webhook.resolveID(webhookResolvable);
    if (!webhookID) throw new Error("Invalid webhook resolvable");

    // Define fetch data
    const path: string = `/webhooks/${webhookID}`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawWebhookData = await fetchQueue.request({
        path,
        method
    });

    // Parse webhook data
    const webhookData: WebhookData = Webhook._fromRawData(result);

    // Return
    return webhookData;
}