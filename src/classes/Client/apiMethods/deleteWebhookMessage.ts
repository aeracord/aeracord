import { Client, FetchQueue, Message, MessageResolvable, Webhook, WebhookResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function deleteWebhookMessage(client: Client, webhookResolvable: WebhookResolvable, webhookToken: string, messageResolvable: MessageResolvable): Promise<void> {

    // Resolve objects
    const webhookID: string | undefined = Webhook.resolveID(webhookResolvable);
    if (!webhookID) throw new Error("Invalid webhook resolvable");
    const messageID: string | undefined = Message.resolveID(messageResolvable);
    if (!messageID) throw new Error("Invalid message resolvable");

    // Define fetch data
    const path: string = `/webhooks/${webhookID}/${webhookToken}/messages/${messageID}`;
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