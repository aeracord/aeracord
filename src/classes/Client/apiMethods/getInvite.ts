import queryString from "query-string";
import { Client, FetchQueue, Invite, InviteResolvable, RawInviteData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface GetInviteData {
    withCounts?: boolean;
}

export default async function getInvite(client: Client, inviteResolvable: InviteResolvable, getInviteData: GetInviteData = {}): Promise<Invite> {

    // Resolve objects
    const inviteCode: string = Invite.resolveCode(inviteResolvable);

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

    // Parse invite
    const invite: Invite = Invite._fromRawData(client, result);

    // Return
    return invite;
}