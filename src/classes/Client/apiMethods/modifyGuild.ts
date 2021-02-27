import { Client, FetchQueue, Guild, GuildResolvable, RawGuildData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface ModifyGuildData {
    name?: string;
    region?: string;
    verificationLevel?: string;
    defaultMessageNotifications?: string;
    explicitContentFilter?: string;
    afkChannelID?: string | null;
    afkTimeout?: string;
    icon?: string | null;
    ownerID?: string;
    splash?: string | null;
    banner?: string | null;
    systemChannelID?: string | null;
    rulesChannelID?: string | null;
    publicUpdatesChannelID?: string | null;
    preferredLocale?: string;
}

export default async function modifyGuild(client: Client, guildResolvable: GuildResolvable, modifyGuildData: ModifyGuildData): Promise<Guild> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);

    // Define fetch data
    const path: string = `/guilds/${guildID}`;
    const method: string = "PATCH";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawGuildData = await fetchQueue.request({
        path,
        method,
        data: {
            name: modifyGuildData.name,
            region: modifyGuildData.region,
            verification_level: modifyGuildData.verificationLevel,
            default_message_notifications: modifyGuildData.defaultMessageNotifications,
            explicit_content_filter: modifyGuildData.explicitContentFilter,
            afk_channel_id: modifyGuildData.afkChannelID,
            afk_timeout: modifyGuildData.afkTimeout,
            icon: modifyGuildData.icon,
            owner_id: modifyGuildData.ownerID,
            splash: modifyGuildData.splash,
            banner: modifyGuildData.banner,
            system_channel_id: modifyGuildData.systemChannelID,
            rules_channel_id: modifyGuildData.rulesChannelID,
            public_updates_channel_id: modifyGuildData.publicUpdatesChannelID,
            preferred_locale: modifyGuildData.preferredLocale
        }
    });

    // Parse guild
    const guild: Guild = Guild._fromRawData(client, result);

    // Return
    return guild;
}