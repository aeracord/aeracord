import { Client, FetchQueue, Guild, GuildResolvable, GuildWidget } from "../../../internal";
import getRoute from "../../../util/getRoute";
import parseGuildWidget from "../events/parseGuildWidget";
import { RawGuildWidgetData } from "../events/rawGuildWidgetData";

export default async function getGuildWidgetSettings(client: Client, guildResolvable: GuildResolvable): Promise<GuildWidget> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);

    // Define fetch data
    const path: string = `/guilds/${guildID}/widget`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawGuildWidgetData = await fetchQueue.request({
        path,
        method
    });

    // Parse guild widget
    const guildWidget: GuildWidget = parseGuildWidget(result);

    // Return
    return guildWidget;
}