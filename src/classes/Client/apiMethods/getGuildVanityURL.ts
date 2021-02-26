import { Client, FetchQueue, Guild, GuildResolvable, VanityInvite } from "../../../internal";
import getRoute from "../../../util/getRoute";
import parseVanityInvite from "../events/parseVanityInvite";
import { RawVanityInviteData } from "../events/rawVanityInviteData";

export default async function getGuildVanityURL(client: Client, guildResolvable: GuildResolvable): Promise<VanityInvite> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);

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
    const vanityInvite: VanityInvite = parseVanityInvite(result);

    // Return
    return vanityInvite;
}