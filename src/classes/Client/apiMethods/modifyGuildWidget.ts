import { Channel, ChannelResolvable, Client, FetchQueue, Guild, GuildResolvable, GuildWidget, GuildWidgetData, RawGuildWidgetData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface ModifyGuildWidgetData {
    enabled?: boolean;
    channel?: string | null;
}

export default async function modifyGuildWidget(client: Client, guildResolvable: GuildResolvable, modifyGuildWidgetData: ModifyGuildWidgetData): Promise<GuildWidgetData> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const channelID: string | undefined | null = modifyGuildWidgetData.channel ? Channel.resolveID(modifyGuildWidgetData.channel) : null;
    if (channelID === undefined) throw new Error("Invalid channel resolvable for widget channel");

    // Define fetch data
    const path: string = `/guilds/${guildID}/widget`;
    const method: string = "PATCH";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawGuildWidgetData = await fetchQueue.request({
        path,
        method,
        data: {
            enabled: modifyGuildWidgetData.enabled,
            channel_id: channelID || undefined
        }
    });

    // Parse guild widget data
    const guildWidgetData: GuildWidgetData = GuildWidget._fromRawData(result, guildID);

    // Return
    return guildWidgetData;
}