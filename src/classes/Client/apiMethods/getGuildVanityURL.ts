import { Client, FetchQueue, Guild, GuildResolvable, RawVanityInviteData, VanityInvite } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getGuildVanityURL(client: Client, guildResolvable: GuildResolvable): Promise<VanityInvite> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");

    // Define fetch data
    const path: string = `/guilds/${guildID}/vanity-url`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawVanityInviteData = await fetchQueue.request({
        path,
        method
    });

    // Parse vanity invite
    const vanityInvite: VanityInvite = VanityInvite._fromRawData(client, result, guildID);

    // Return
    return vanityInvite;
}