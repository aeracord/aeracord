import { Channel, ChannelResolvable, Client, FetchQueue, Invite, RawInviteData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getChannelInvites(client: Client, channelResolvable: ChannelResolvable): Promise<Invite[]> {

    // Resolve objects
    const channelID: string = Channel.resolveID(channelResolvable);

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
    const invites: Invite[] = result.map((i: RawInviteData) => Invite._fromRawData(client, i));

    // Return
    return invites;
}