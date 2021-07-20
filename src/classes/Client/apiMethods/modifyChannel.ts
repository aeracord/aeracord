import { AnyGuildChannel, Channel, ChannelResolvable, Client, CHANNEL_TYPE_NEWS, CHANNEL_TYPE_TEXT, FetchQueue, PermissionError, PermissionOverwrite, RawChannelData, ThreadCacheData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface ModifyChannelData {
    name?: string;
    type?: ModifyChannelDataType;
    position?: number;
    topic?: string | null;
    nsfw?: boolean | null;
    rateLimitPerUser?: number | null;
    bitrate?: number | null;
    userLimit?: number | null;
    permissionOverwrites?: PermissionOverwrite[] | null;
    parent?: ChannelResolvable | null;
}

export type ModifyChannelDataType = typeof CHANNEL_TYPE_TEXT | typeof CHANNEL_TYPE_NEWS;

export default async function modifyChannel(client: Client, channelResolvable: ChannelResolvable, modifyChannelData: ModifyChannelData, reason?: string): Promise<AnyGuildChannel> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const parentID: string | undefined | null = modifyChannelData.parent ? Channel.resolveID(modifyChannelData.parent) : null;
    if (parentID === undefined) throw new Error("Invalid channel resolvable for parent");

    // Missing permissions
    if (client._cacheStrategies.permissions.enabled) {

        // Get the thread cache data
        const threadCacheData: ThreadCacheData | undefined = client._threadChannels?.get(channelID);

        if (threadCacheData) {

            /**
             * You need the manage threads permission to modify the channel
             * unless youre the creator of the thread
             */
            if ((!client.hasPermission("MANAGE_THREADS", channelID)) && (!threadCacheData.createdByClient)) throw new PermissionError({ permission: "MANAGE_THREADS" });
        }
        else {
            if (!client.hasPermission("MANAGE_CHANNELS", channelID)) throw new PermissionError({ permission: "MANAGE_CHANNELS" });
            if ((modifyChannelData.permissionOverwrites) && (!client.hasPermission("MANAGE_ROLES", channelID))) throw new PermissionError({ permission: "MANAGE_ROLES" });
        }
    }

    // Define fetch data
    const path: string = `/channels/${channelID}`;
    const method: string = "PATCH";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawChannelData = await fetchQueue.request({
        path,
        method,
        data: {
            name: modifyChannelData.name,
            type: modifyChannelData.type,
            position: modifyChannelData.position,
            topic: modifyChannelData.topic,
            nsfw: modifyChannelData.nsfw,
            rate_limit_per_user: modifyChannelData.rateLimitPerUser,
            bitrate: modifyChannelData.bitrate,
            user_limit: modifyChannelData.userLimit,
            permission_overwrites: modifyChannelData.permissionOverwrites,
            parent_id: parentID || undefined
        },
        auditLogReason: reason
    });

    // Parse guild channel
    const guildChannel: AnyGuildChannel = Channel._fromRawData(client, result) as AnyGuildChannel;

    // Return
    return guildChannel;
}