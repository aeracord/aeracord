import { Client, DefaultMessageNotifications, ExplicitContentFilter, FetchQueue, Guild, GuildChannelType, RawChannelDataPermissionOverwrite, RawGuildData, VerificationLevel } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface CreateGuildData {
    name: string;
    region?: string;
    icon?: string;
    verificationLevel?: VerificationLevel;
    defaultMessageNotifications?: DefaultMessageNotifications;
    explicitContentFilter?: ExplicitContentFilter;
    roles?: CreateGuildDataRole[];
    channels?: CreateGuildDataChannel[];
    afkChannelID?: string;
    afkTimeout?: number;
    systemChannelID?: string;
}

export interface CreateGuildDataRole {
    id: string;
    name: string;
    color?: number;
    hoist?: boolean;
    position?: number;
    permissions?: string;
    mentionable?: boolean;
    managed?: boolean;
}

export interface CreateGuildDataChannel {
    id: string;
    type: GuildChannelType;
    name: string;
    topic?: string;
    position?: number;
    nsfw?: boolean;
    permissionOverwrites?: CreateGuildDataChannelPermissionOverwrite[];
    bitrate?: number;
    userLimit?: number;
    rateLimitPerUser?: number;
    parentID?: string;
}

export type CreateGuildDataChannelPermissionOverwrite = RawChannelDataPermissionOverwrite;

export default async function createGuild(client: Client, createGuildData: CreateGuildData): Promise<Guild> {

    // Define fetch data
    const path: string = "/guilds";
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawGuildData = await fetchQueue.request({
        path,
        method,
        data: {
            name: createGuildData.name,
            region: createGuildData.region,
            icon: createGuildData.icon,
            verification_level: createGuildData.verificationLevel,
            default_message_notifications: createGuildData.defaultMessageNotifications,
            explicit_content_filter: createGuildData.explicitContentFilter,
            roles: createGuildData.roles,
            channels: createGuildData.channels?.map((c: CreateGuildDataChannel) => ({
                id: c.id,
                type: c.type,
                name: c.name,
                topic: c.topic,
                position: c.position,
                nsfw: c.nsfw,
                permission_overwrites: c.permissionOverwrites,
                bitrate: c.bitrate,
                user_limit: c.userLimit,
                rate_limit_per_user: c.rateLimitPerUser,
                parent_id: c.parentID
            })),
            afk_channel_id: createGuildData.afkChannelID,
            afk_timeout: createGuildData.afkTimeout,
            system_channel_id: createGuildData.systemChannelID
        }
    });

    // Parse guild
    const guild: Guild = Guild._fromRawData(client, result);

    // Return
    return guild;
}