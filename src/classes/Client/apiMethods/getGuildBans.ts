import { Ban, Client, FetchQueue, Guild, GuildResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";
import parseBan from "../events/parseBan";
import { RawBanData } from "../events/rawBanData";

export default async function getGuildBans(client: Client, guildResolvable: GuildResolvable): Promise<Ban[]> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);

    // Define fetch data
    const path: string = `/guilds/${guildID}/bans`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawBanData[] = await fetchQueue.request({
        path,
        method
    });

    // Parse bans
    const bans: Ban[] = result.map((b: RawBanData) => parseBan(client, b));

    // Return
    return bans;
}