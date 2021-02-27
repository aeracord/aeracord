import { Client, RawWebhookData, Webhook } from "../../internal";

export default function fromRawData(client: Client, rawData: RawWebhookData): Webhook {

    // Parse webhook
    const webhook: Webhook = new Webhook(client, {
        id: rawData.id,
        username: rawData.username,
        avatar: rawData.avatar || undefined
    });

    // Return
    return webhook;
}