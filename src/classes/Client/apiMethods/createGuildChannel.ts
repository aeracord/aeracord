import { AnyGuildChannel, Channel, Client, FetchQueue, Guild, GuildChannelType, GuildResolvable, PermissionOverwrite, RawChannelData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface CreateGuildChannelData {
    name: string;
    type: GuildChannelType;
    position?: number;
    topic?: string;
    nsfw?: boolean;
    rateLimitPerUser?: number;
    bitrate?: number;
    userLimit?: number;
    permissionOverwrites?: PermissionOverwrite[];
    parentID?: string;
}

export default async function createGuildChannel(client: Client, guildResolvable: GuildResolvable, createGuildChannelData: CreateGuildChannelData): Promise<AnyGuildChannel> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);

    // Define fetch data
    const path: string = `/guilds/${guildID}/channels`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawChannelData = await fetchQueue.request({
        path,
        method,
        data: {
            name: createGuildChannelData.name,
            type: createGuildChannelData.type,
            position: createGuildChannelData.position,
            topic: createGuildChannelData.topic,
            nsfw: createGuildChannelData.nsfw,
            rate_limit_per_user: createGuildChannelData.rateLimitPerUser,
            bitrate: createGuildChannelData.bitrate,
            user_limit: createGuildChannelData.userLimit,
            permission_overwrites: createGuildChannelData.permissionOverwrites,
            parent_id: createGuildChannelData.parentID
        }
    });

    // Parse channel
    const channel: AnyGuildChannel = Channel._fromRawData(client, result) as AnyGuildChannel;

    // Return
    return channel;
}