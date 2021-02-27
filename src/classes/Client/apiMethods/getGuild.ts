import queryString from "query-string";
import { Client, FetchQueue, Guild, GuildResolvable, RawGuildData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface GetGuildData {
    withCounts?: boolean;
}

export default async function getGuild(client: Client, guildResolvable: GuildResolvable, getGuildData: GetGuildData = {}): Promise<Guild> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);

    // Define fetch data
    const path: string = `/guilds/${guildID}?${queryString.stringify({
        with_counts: getGuildData.withCounts
    })}`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawGuildData = await fetchQueue.request({
        path,
        method
    });

    // Parse guild
    const guild: Guild = Guild._fromRawData(client, result);

    // Return
    return guild;
}