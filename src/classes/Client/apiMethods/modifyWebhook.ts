import { Channel, ChannelResolvable, Client, FetchQueue, RawWebhookData, Webhook, WebhookData, WebhookResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface ModifyWebhookData {
    name?: string;
    avatar?: string | null;
    channel?: ChannelResolvable;
}

export default async function modifyWebhook(client: Client, webhookResolvable: WebhookResolvable, modifyWebhookData: ModifyWebhookData): Promise<WebhookData> {

    // Resolve objects
    const webhookID: string | undefined = Webhook.resolveID(webhookResolvable);
    if (!webhookID) throw new Error("Invalid webhook resolvable");
    const channelID: string | undefined | null = modifyWebhookData.channel ? Channel.resolveID(modifyWebhookData.channel) : null;
    if (channelID === undefined) throw new Error("Invalid channel resolvable for webhook channel");

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
            channel_id: channelID || undefined
        }
    });

    // Parse webhook data
    const webhookData: WebhookData = Webhook._fromRawData(result);

    // Return
    return webhookData;
}