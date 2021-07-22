import { APIError, Channel, ChannelResolvable, Client, FetchQueue, PermissionError, RawWebhookData, Webhook, WebhookResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getWebhook(client: Client, channelResolvable: ChannelResolvable, webhookResolvable: WebhookResolvable): Promise<Webhook | undefined> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const webhookID: string | undefined = Webhook.resolveID(webhookResolvable);
    if (!webhookID) throw new Error("Invalid webhook resolvable");

    // Missing permissions
    if (!client.hasPermission("MANAGE_WEBHOOKS", channelID)) throw new PermissionError({ permission: "MANAGE_WEBHOOKS" });

    // Define fetch data
    const path: string = `/webhooks/${webhookID}`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    let unknownWebhook: boolean = false;
    const result: RawWebhookData = await fetchQueue.request({
        path,
        method
    }).catch((err: APIError) => {

        // Unknown webhook
        if ((err.code === 10015) || (err.errors?.webhook_id?._errors?.[0]?.code === "NUMBER_TYPE_COERCE")) unknownWebhook = true;

        // Throw error
        else throw err;
    });

    // Unknown webhook
    if (unknownWebhook) return;

    // Parse webhook
    const webhook: Webhook = Webhook._fromRawData(client, result);

    // Return
    return webhook;
}