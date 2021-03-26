import queryString from "query-string";
import { Client, FetchQueue, Invite, InviteData, InviteResolvable, RawInviteData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface GetInviteData {
    withCounts?: boolean;
}

export default async function getInvite(client: Client, inviteResolvable: InviteResolvable, getInviteData: GetInviteData = {}): Promise<InviteData> {

    // Resolve objects
    const inviteCode: string | undefined = Invite.resolveCode(inviteResolvable);
    if (!inviteCode) throw new Error("Invalid invite resolvable");

    // Define fetch data
    const path: string = `/invites/${inviteCode}?${queryString.stringify({
        with_counts: getInviteData.withCounts
    })}`;
    const method: string = "GET";
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