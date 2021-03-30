import { Client, Webhook, WebhookData } from "../../internal";

export default function fromData(client: Client, webhookData: WebhookData): Webhook {

    // Update cached webhook
    let webhook: Webhook | undefined = Webhook._updateObjectFromData(client, webhookData);

    // Create webhook
    if (!webhook) webhook = new Webhook(client, webhookData);

    // Return
    return webhook;
}