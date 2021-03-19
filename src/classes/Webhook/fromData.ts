import { Client, Webhook, WebhookData } from "../../internal";

export default function fromData(client: Client, webhookData: WebhookData): Webhook {

    // Create webhook
    const webhook: Webhook = new Webhook(client, webhookData);

    // Return
    return webhook;
}