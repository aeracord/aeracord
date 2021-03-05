import { Webhook, WebhookResolvable } from "../../internal";

export default function resolveID(webhookResolvable: WebhookResolvable): string | undefined {

    // Webhook
    if (webhookResolvable instanceof Webhook) return webhookResolvable.id;

    // Webhook ID
    else if (/^[0-9]{17,}$/.test(webhookResolvable)) return webhookResolvable;
}