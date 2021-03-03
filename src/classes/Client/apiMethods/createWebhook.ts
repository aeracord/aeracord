import { Channel, ChannelResolvable, Client, FetchQueue, RawWebhookData, Webhook } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface CreateWebhookData {
    name: string;
    avatar?: string;
}

export default async function createWebhook(client: Client, channelResolvable: ChannelResolvable, createWebhookData: CreateWebhookData): Promise<Webhook> {

    // Resolve objects
    const channelID: string = Channel.resolveID(channelResolvable);

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
        }
    });

    // Parse webhook
    const webhook: Webhook = Webhook._fromRawData(client, result);

    // Return
    return webhook;
}