import { Client, FetchQueue, Guild, GuildResolvable, GuildWidget, RawGuildWidgetData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface ModifyGuildWidgetData {
    enabled?: boolean;
    channelID?: string | null;
}

export default async function modifyGuildWidget(client: Client, guildResolvable: GuildResolvable, modifyGuildWidgetData: ModifyGuildWidgetData): Promise<GuildWidget> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");

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
            channel_id: modifyGuildWidgetData.channelID
        }
    });

    // Parse guild widget
    const guildWidget: GuildWidget = GuildWidget._fromRawData(client, result, guildID);

    // Return
    return guildWidget;
}