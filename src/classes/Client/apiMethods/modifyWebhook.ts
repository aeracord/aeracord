import { Channel, ChannelResolvable, Client, FetchQueue, RawWebhookData, Webhook, WebhookResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface ModifyWebhookData {
    name?: string;
    avatar?: string | null;
    channel?: ChannelResolvable;
}

export default async function modifyWebhook(client: Client, channelResolvable: ChannelResolvable, webhookResolvable: WebhookResolvable, modifyWebhookData: ModifyWebhookData, reason?: string): Promise<Webhook> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const webhookID: string | undefined = Webhook.resolveID(webhookResolvable);
    if (!webhookID) throw new Error("Invalid webhook resolvable");
    const targetChannelID: string | undefined | null = modifyWebhookData.channel ? Channel.resolveID(modifyWebhookData.channel) : null;
    if (targetChannelID === undefined) throw new Error("Invalid channel resolvable for webhook channel");

    // Missing permissions
    if (client._cacheStrategies.permissions.enabled) {
        if (!client.hasPermission("MANAGE_WEBHOOKS", channelID)) throw new Error("Missing manage webhooks permissions");
        if ((targetChannelID) && (!client.hasPermission("MANAGE_WEBHOOKS", targetChannelID))) throw new Error("Missing manage webhooks permissions in the target channel");
    }

    // Define fetch data
    const path: string = `/webhooks/${webhookID}`;
    const method: string = "PATCH";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawWebhookData = await fetchQueue.request({
        path,
        method,
        data: {
            name: modifyWebhookData.name,
            avatar: modifyWebhookData.avatar,
            channel_id: targetChannelID || undefined
        },
        auditLogReason: reason
    });

    // Parse webhook
    const webhook: Webhook = Webhook._fromRawData(client, result);

    // Return
    return webhook;
}