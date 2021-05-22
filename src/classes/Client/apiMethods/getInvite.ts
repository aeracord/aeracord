import queryString from "query-string";
import { APIError, Client, FetchQueue, Invite, InviteResolvable, RawInviteData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface GetInviteData {
    withCounts?: boolean;
    withExpiration?: boolean;
}

export default async function getInvite(client: Client, inviteResolvable: InviteResolvable, getInviteData: GetInviteData = {}): Promise<Invite | undefined> {

    // Resolve objects
    const inviteCode: string | undefined = Invite.resolveCode(inviteResolvable);
    if (!inviteCode) throw new Error("Invalid invite resolvable");

    // Define fetch data
    const path: string = `/invites/${inviteCode}?${queryString.stringify({
        with_counts: getInviteData.withCounts,
        with_expiration: getInviteData.withExpiration
    })}`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    let unknownInvite: boolean = false;
    const result: RawInviteData = await fetchQueue.request({
        path,
        method
    }).catch((err: APIError) => {

        // Unknown invite
        if (err.code === 10006) unknownInvite = true;

        // Throw error
        else throw err;
    });

    // Unknown invite
    if (unknownInvite) return;

    // Parse invite
    const invite: Invite = Invite._fromRawData(client, result);

    // Return
    return invite;
}