import { Client, FetchQueue, Guild, GuildResolvable, Invite, PermissionError, RawInviteData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getGuildInvites(client: Client, guildResolvable: GuildResolvable): Promise<Invite[]> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");

    // Missing permissions
    if (!client.hasPermission("MANAGE_GUILD", guildID)) throw new PermissionError({ permission: "MANAGE_GUILD" });

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
    const invites: Invite[] = result.map((i: RawInviteData) => Invite._fromRawData(client, i));

    // Return
    return invites;
}