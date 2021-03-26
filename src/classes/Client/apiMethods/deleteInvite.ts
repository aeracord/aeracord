import { Client, FetchQueue, Invite, InviteData, InviteResolvable, RawInviteData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function deleteInvite(client: Client, inviteResolvable: InviteResolvable): Promise<InviteData> {

    // Resolve objects
    const inviteCode: string | undefined = Invite.resolveCode(inviteResolvable);
    if (!inviteCode) throw new Error("Invalid invite resolvable");

    // Define fetch data
    const path: string = `/invites/${inviteCode}`;
    const method: string = "DELETE";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawInviteData = await fetchQueue.request({
        path,
        method
    });

    // Parse invite data
    const inviteData: InviteData = Invite._fromRawData(client, result);

    // Return
    return inviteData;
}