import { Channel, ChannelResolvable, Client, FetchQueue, Invite, InviteResolvable, PermissionError, RawInviteData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function deleteInvite(client: Client, channelResolvable: ChannelResolvable, inviteResolvable: InviteResolvable, reason?: string): Promise<Invite> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const inviteCode: string | undefined = Invite.resolveCode(inviteResolvable);
    if (!inviteCode) throw new Error("Invalid invite resolvable");

    // Missing permissions
    if ((client._cacheStrategies.permissions.enabled) && (!client.hasPermission("MANAGE_CHANNELS", channelID))) throw new PermissionError({ permission: "MANAGE_CHANNELS" });

    // Define fetch data
    const path: string = `/invites/${inviteCode}`;
    const method: string = "DELETE";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawInviteData = await fetchQueue.request({
        path,
        method,
        auditLogReason: reason
    });

    // Parse invite
    const invite: Invite = Invite._fromRawData(client, result);

    // Return
    return invite;
}