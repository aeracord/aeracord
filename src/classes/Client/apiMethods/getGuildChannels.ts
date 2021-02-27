import { Channel, Client, FetchQueue, Guild, GuildChannel, GuildResolvable, RawChannelData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getGuildChannels(client: Client, guildResolvable: GuildResolvable): Promise<GuildChannel[]> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);

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

    // Parse channels
    const channels: GuildChannel[] = result.map((c: RawChannelData) => Channel._fromRawData(client, c)) as GuildChannel[];

    // Return
    return channels;
}