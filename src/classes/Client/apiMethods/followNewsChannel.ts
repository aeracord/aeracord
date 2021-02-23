import { Channel, ChannelResolvable, Client, FetchQueue } from "../../../internal";
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
    const channelID: string = Channel.resolveID(channelResolvable);
    followNewsChannelData.targetChannel = Channel.resolveID(followNewsChannelData.targetChannel);

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
            webhook_channel_id: followNewsChannelData.targetChannel
        }
    });

    // Return
    return {
        id: result.channel_id,
        webhookID: result.webhook_id
    };
}