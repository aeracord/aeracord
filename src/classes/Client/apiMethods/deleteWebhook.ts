import { Channel, ChannelResolvable, Client, FetchQueue, Webhook, WebhookResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function deleteWebhook(client: Client, channelResolvable: ChannelResolvable, webhookResolvable: WebhookResolvable, reason?: string): Promise<void> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const webhookID: string | undefined = Webhook.resolveID(webhookResolvable);
    if (!webhookID) throw new Error("Invalid webhook resolvable");

    // Missing permissions
    if ((client._cacheStrategies.permissions.enabled) && (!client.hasPermission("MANAGE_WEBHOOKS", channelID))) throw new Error("Missing manage webhooks permissions");

    // Define fetch data
    const path: string = `/webhooks/${webhookID}`;
    const method: string = "DELETE";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    await fetchQueue.request({
        path,
        method,
        auditLogReason: reason
    });
}