import { Channel, ChannelResolvable, Client, FetchQueue, PermissionError, RawWebhookData, Webhook } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface CreateWebhookData {
    name: string;
    avatar?: string;
}

export default async function createWebhook(client: Client, channelResolvable: ChannelResolvable, createWebhookData: CreateWebhookData, reason?: string): Promise<Webhook> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");

    // Missing permissions
    if (!client.hasPermission("MANAGE_WEBHOOKS", channelID)) throw new PermissionError({ permission: "MANAGE_WEBHOOKS" });

    // Define fetch data
    const path: string = `/channels/${channelID}/webhooks`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawWebhookData = await fetchQueue.request({
        path,
        method,
        data: {
            name: createWebhookData.name,
            avatar: createWebhookData.avatar
        },
        auditLogReason: reason
    });

    // Parse webhook
    const webhook: Webhook = Webhook._fromRawData(client, result);

    // Return
    return webhook;
}