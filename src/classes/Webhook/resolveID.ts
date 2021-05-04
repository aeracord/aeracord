import { WebhookResolvable } from "../../internal";

export default function resolveID(webhookResolvable: WebhookResolvable): string | undefined {

    // Webhook
    if ((typeof webhookResolvable === "object") && ("id" in webhookResolvable)) return webhookResolvable.id;

    // Webhook ID
    else if (typeof webhookResolvable === "string") return webhookResolvable;
}