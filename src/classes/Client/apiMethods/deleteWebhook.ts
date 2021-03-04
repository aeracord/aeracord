import { Client, FetchQueue, Webhook, WebhookResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function deleteWebhook(client: Client, webhookResolvable: WebhookResolvable): Promise<void> {

    // Resolve objects
    const webhookID: string = Webhook.resolveID(webhookResolvable);

    // Define fetch data
    const path: string = `/webhooks/${webhookID}`;
    const method: string = "DELETE";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    await fetchQueue.request({
        path,
        method
    });
}