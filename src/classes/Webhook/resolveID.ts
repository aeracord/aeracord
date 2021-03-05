import { Webhook, WebhookResolvable } from "../../internal";
import isID from "../../util/isID";

export default function resolveID(webhookResolvable: WebhookResolvable): string | undefined {

    // Webhook
    if (webhookResolvable instanceof Webhook) return webhookResolvable.id;

    // Webhook ID
    else if (isID(webhookResolvable)) return webhookResolvable;
}