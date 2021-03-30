import { Client, Webhook, WebhookData } from "../../internal";

export default function updateObjectFromData(client: Client, webhookData: WebhookData): Webhook | undefined {

    // Get webhook from cache
    let webhook: Webhook | undefined = client.webhooks.get(webhookData.id);

    // Update webhook object
    if (webhook) Webhook._updateObject(webhook, webhookData);

    // Return
    return webhook;
}