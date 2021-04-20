import { Channel, ChannelResolvable, Client, FetchQueue, PermissionError } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface FollowNewsChannelData {
    targetChannel: ChannelResolvable;
}

export interface FollowedChannel {
    id: string;
    webhookID: string;
}

interface RawFollowedChannel {
    channel_id: string;
    webhook_id: string;
}

export default async function followNewsChannel(client: Client, channelResolvable: ChannelResolvable, followNewsChannelData: FollowNewsChannelData): Promise<FollowedChannel> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const targetChannel: string | undefined = Channel.resolveID(followNewsChannelData.targetChannel);
    if (!targetChannel) throw new Error("Invalid channel resolvable for target channel");

    // Missing permissions
    if ((client._cacheStrategies.permissions.enabled) && (!client.hasPermission("MANAGE_WEBHOOKS", targetChannel))) throw new PermissionError({ permission: "MANAGE_WEBHOOKS" });

    // Define fetch data
    const path: string = `/channels/${channelID}/followers`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawFollowedChannel = await fetchQueue.request({
        path,
        method,
        data: {
            webhook_channel_id: targetChannel
        }
    });

    // Return
    return {
        id: result.channel_id,
        webhookID: result.webhook_id
    };
}