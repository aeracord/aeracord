import { Channel, ChannelResolvable, Client, FetchQueue, Guild, GuildResolvable, RawWelcomeScreenData, WelcomeScreen, WelcomeScreenData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface ModifyGuildWelcomeScreenData {
    enabled?: boolean;
    description?: string;
    channels?: ChannelResolvable[];
}

export default async function modifyGuildWelcomeScreen(client: Client, guildResolvable: GuildResolvable, modifyGuildWelcomeScreenData: ModifyGuildWelcomeScreenData): Promise<WelcomeScreenData> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const channelIDs: Array<string | undefined> | undefined = modifyGuildWelcomeScreenData.channels?.map((c: ChannelResolvable) => Channel.resolveID(c));
    if (channelIDs?.find((c: string | undefined) => !c)) throw new Error("Invalid channel resolvable for welcome screen channels");

    // Missing permissions
    if ((client._cacheStrategies.permissions.enabled) && (!client.hasPermission("MANAGE_GUILD", guildID))) throw new Error("Missing manage guild permissions");

    // Define fetch data
    const path: string = `/guilds/${guildID}/welcome-screen`;
    const method: string = "PATCH";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawWelcomeScreenData = await fetchQueue.request({
        path,
        method,
        data: {
            enabled: modifyGuildWelcomeScreenData.enabled,
            description: modifyGuildWelcomeScreenData.description,
            welcome_channels: channelIDs
        }
    });

    // Parse welcome screen data
    const welcomeScreenData: WelcomeScreenData = WelcomeScreen._fromRawData(client, result, guildID);

    // Return
    return welcomeScreenData;
}