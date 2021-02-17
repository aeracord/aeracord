import { Client, Webhook } from "../../../internal";
import { RawWebhookData } from "./rawWebhookData";

export default function parseWebhook(client: Client, rawData: RawWebhookData): Webhook {

    // Parse webhook
    const webhook: Webhook = new Webhook(client, {
        id: rawData.id,
        username: rawData.username,
        avatar: rawData.avatar || undefined
    });

    // Return
    return webhook;
}