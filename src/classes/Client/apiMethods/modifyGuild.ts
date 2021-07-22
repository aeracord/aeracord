import { Channel, ChannelResolvable, Client, FetchQueue, Guild, GuildResolvable, PermissionError, RawGuildData, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface ModifyGuildData {
    name?: string;
    region?: string;
    verificationLevel?: string;
    defaultMessageNotifications?: string;
    explicitContentFilter?: string;
    afkChannel?: ChannelResolvable | null;
    afkTimeout?: string;
    icon?: string | null;
    owner?: UserResolvable;
    splash?: string | null;
    banner?: string | null;
    systemChannel?: ChannelResolvable | null;
    rulesChannel?: ChannelResolvable | null;
    publicUpdatesChannel?: ChannelResolvable | null;
    preferredLocale?: string;
}

export default async function modifyGuild(client: Client, guildResolvable: GuildResolvable, modifyGuildData: ModifyGuildData, reason?: string): Promise<Guild> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const afkChannelID: string | undefined | null = modifyGuildData.afkChannel ? Channel.resolveID(modifyGuildData.afkChannel) : null;
    if (afkChannelID === undefined) throw new Error("Invalid channel resolvable for AFK channel");
    const ownerID: string | undefined | null = modifyGuildData.owner ? User.resolveID(modifyGuildData.owner) : null;
    if (ownerID === undefined) throw new Error("Invalid user resolvable for owner");
    const systemChannelID: string | undefined | null = modifyGuildData.systemChannel ? Channel.resolveID(modifyGuildData.systemChannel) : null;
    if (systemChannelID === undefined) throw new Error("Invalid channel resolvable for system channel");
    const rulesChannelID: string | undefined | null = modifyGuildData.rulesChannel ? Channel.resolveID(modifyGuildData.rulesChannel) : null;
    if (rulesChannelID === undefined) throw new Error("Invalid channel resolvable for rules channel");
    const publicUpdatesChannelID: string | undefined | null = modifyGuildData.publicUpdatesChannel ? Channel.resolveID(modifyGuildData.publicUpdatesChannel) : null;
    if (publicUpdatesChannelID === undefined) throw new Error("Invalid channel resolvable for public updates channel");

    // Missing permissions
    if (!client.hasPermission("MANAGE_GUILD", guildID)) throw new PermissionError({ permission: "MANAGE_GUILD" });

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
            afk_channel_id: afkChannelID || undefined,
            afk_timeout: modifyGuildData.afkTimeout,
            icon: modifyGuildData.icon,
            owner_id: ownerID || undefined,
            splash: modifyGuildData.splash,
            banner: modifyGuildData.banner,
            system_channel_id: systemChannelID || undefined,
            rules_channel_id: rulesChannelID || undefined,
            public_updates_channel_id: publicUpdatesChannelID || undefined,
            preferred_locale: modifyGuildData.preferredLocale
        },
        auditLogReason: reason
    });

    // Parse guild
    const guild: Guild = Guild._fromRawData(client, result);

    // Return
    return guild;
}