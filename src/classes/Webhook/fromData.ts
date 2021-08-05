import { Client, Webhook, WebhookData } from "../../internal";

export default function fromData(client: Client, webhookData: WebhookData): Webhook {

    // Get webhook from cache
    let webhook: Webhook | undefined = client.webhooks.get(webhookData.id);

    // Create webhook
    if (!webhook) webhook = new Webhook(client, webhookData);

    // Return
    return webhook;
}