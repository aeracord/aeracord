import { AnyChannel, Client, CHANNEL_TYPE_NEWS, CHANNEL_TYPE_TEXT, FetchQueue, PermissionOverwrite } from "../../../../internal";
import getRoute from "../../../../util/getRoute";
import parseChannel from "../../events/parseChannel";
import { RawChannelData } from "../../events/rawChannelData";

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
    parentID?: string | null;
}

export type ModifyChannelDataType = typeof CHANNEL_TYPE_TEXT | typeof CHANNEL_TYPE_NEWS;

export default async function modifyChannel(client: Client, channelID: string, modifyChannelData: ModifyChannelData): Promise<AnyChannel> {

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
            parent_id: modifyChannelData.parentID
        }
    });

    // Parse channel
    const channel: AnyChannel = parseChannel(client, result);

    // Return
    return channel;
}