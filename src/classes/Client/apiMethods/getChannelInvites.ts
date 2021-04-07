import { Channel, ChannelResolvable, Client, FetchQueue, Invite, InviteData, RawInviteData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getChannelInvites(client: Client, channelResolvable: ChannelResolvable): Promise<InviteData[]> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");

    // Missing permissions
    if ((client._cacheStrategies.permissions.enabled) && (!client.hasPermission("MANAGE_CHANNELS", channelID))) throw new Error("Missing manage channels permissions");

    // Define fetch data
    const path: string = `/channels/${channelID}/invites`;
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
    const invites: InviteData[] = result.map((i: RawInviteData) => Invite._fromRawData(client, i));

    // Return
    return invites;
}