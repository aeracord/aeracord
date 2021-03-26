import { AnyGuildChannelData, Channel, Client, FetchQueue, Guild, GuildResolvable, RawChannelData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getGuildChannels(client: Client, guildResolvable: GuildResolvable): Promise<AnyGuildChannelData[]> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");

    // Define fetch data
    const path: string = `/guilds/${guildID}/channels`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawChannelData[] = await fetchQueue.request({
        path,
        method
    });

    // Parse guild channels
    const guildChannels: AnyGuildChannelData[] = result.map((c: RawChannelData) => Channel._fromRawData(client, c)) as AnyGuildChannelData[];

    // Return
    return guildChannels;
}