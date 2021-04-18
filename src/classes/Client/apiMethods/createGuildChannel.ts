import { AnyGuildChannel, Channel, ChannelResolvable, Client, FetchQueue, Guild, GuildChannelType, GuildResolvable, PermissionOverwrite, RawChannelData } from "../../../internal";
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
    parent?: ChannelResolvable;
}

export default async function createGuildChannel(client: Client, guildResolvable: GuildResolvable, createGuildChannelData: CreateGuildChannelData, reason?: string): Promise<AnyGuildChannel> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const parentID: string | undefined | null = createGuildChannelData.parent ? Channel.resolveID(createGuildChannelData.parent) : null;
    if (parentID === undefined) throw new Error("Invalid channel resolvable for parent");

    // Missing permissions
    if ((client._cacheStrategies.permissions.enabled) && (!client.hasPermission("MANAGE_CHANNELS", guildID))) throw new Error("Missing manage channels permissions");

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
            parent_id: parentID || undefined
        },
        auditLogReason: reason
    });

    // Parse guild channel
    const guildChannel: AnyGuildChannel = Channel._fromRawData(client, result) as AnyGuildChannel;

    // Return
    return guildChannel;
}