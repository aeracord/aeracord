import { Client, Webhook, WebhookData } from "../../internal";

export default function fromData(client: Client, webhookData: WebhookData): Webhook {

    // Get webhook from cache
    let webhook: Webhook | undefined = client.webhooks.get(webhookData.id);

    // Update webhook object
    if (webhook) Webhook._updateObject(webhook, webhookData);

    // Create webhook
    else webhook = new Webhook(client, webhookData);

    // Return
    return webhook;
}