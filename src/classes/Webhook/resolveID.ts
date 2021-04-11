import { WebhookResolvable } from "../../internal";
import isID from "../../util/isID";

export default function resolveID(webhookResolvable: WebhookResolvable): string | undefined {

    // Webhook
    if ((typeof webhookResolvable === "object") && ("id" in webhookResolvable)) return webhookResolvable.id;

    // Webhook ID
    else if (isID(webhookResolvable)) return webhookResolvable;
}