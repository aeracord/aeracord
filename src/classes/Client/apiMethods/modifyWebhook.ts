import { Client, FetchQueue, RawWebhookData, Webhook, WebhookResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface ModifyWebhookData {
    name?: string;
    avatar?: string | null;
    channelID?: string;
}

export default async function modifyWebhook(client: Client, webhookResolvable: WebhookResolvable, modifyWebhookData: ModifyWebhookData): Promise<Webhook> {

    // Resolve objects
    const webhookID: string = Webhook.resolveID(webhookResolvable);

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
            channel_id: modifyWebhookData.channelID,
        }
    });

    // Parse webhook
    const webhook: Webhook = Webhook._fromRawData(client, result);

    // Return
    return webhook;
}