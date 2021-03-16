import { Client, FetchQueue, Guild, GuildResolvable, Invite, InviteData, RawInviteData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getGuildInvites(client: Client, guildResolvable: GuildResolvable): Promise<InviteData[]> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");

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
    const invites: InviteData[] = result.map((i: RawInviteData) => Invite._fromRawData(i));

    // Return
    return invites;
}