import { Ban, Client, FetchQueue, Guild, GuildResolvable, RawBanData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getGuildBans(client: Client, guildResolvable: GuildResolvable): Promise<Ban[]> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");

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
    const bans: Ban[] = result.map((b: RawBanData) => Ban._fromRawData(client, b, guildID));

    // Return
    return bans;
}