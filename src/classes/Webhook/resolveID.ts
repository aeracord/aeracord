import { Webhook, WebhookResolvable } from "../../internal";

export default function resolveID(webhookResolvable: WebhookResolvable): string {

    // Webhook
    if (webhookResolvable instanceof Webhook) return webhookResolvable.id;

    // Webhook ID
    else return webhookResolvable;
}