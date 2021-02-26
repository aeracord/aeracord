import { Client, FetchQueue, Guild, GuildResolvable, Invite } from "../../../internal";
import getRoute from "../../../util/getRoute";
import parseInvite from "../events/parseInvite";
import { RawInviteData } from "../events/rawInviteData";

export default async function getGuildInvites(client: Client, guildResolvable: GuildResolvable): Promise<Invite[]> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);

    // Define fetch data
    const path: string = `/guilds/${guildID}/invites`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawInviteData[] = await fetchQueue.request({
        path,
        method
    });

    // Parse invites
    const invites: Invite[] = result.map((i: RawInviteData) => parseInvite(client, i));

    // Return
    return invites;
}