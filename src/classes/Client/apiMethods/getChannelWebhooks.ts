import { Channel, ChannelResolvable, Client, FetchQueue, PermissionError, RawWebhookData, Webhook } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getChannelWebhooks(client: Client, channelResolvable: ChannelResolvable): Promise<Webhook[]> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");

    // Missing permissions
    if ((client._cacheStrategies.permissions.enabled) && (!client.hasPermission("MANAGE_WEBHOOKS", channelID))) throw new PermissionError({ permission: "MANAGE_WEBHOOKS" });

    // Define fetch data
    const path: string = `/channels/${channelID}/webhooks`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawWebhookData[] = await fetchQueue.request({
        path,
        method
    });

    // Parse webhooks
    const webhooks: Webhook[] = result.map((w: RawWebhookData) => Webhook._fromRawData(client, w));

    // Return
    return webhooks;
}