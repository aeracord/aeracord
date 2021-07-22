import { Channel, ChannelResolvable, Client, FetchQueue, Invite, PermissionError, RawInviteData, TargetType, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface CreateChannelInviteData {
    maxAge?: number;
    maxUses?: number;
    temporary?: boolean;
    unique?: boolean;
    targetUser?: UserResolvable;
    targetType?: TargetType;
}

export default async function createChannelInvite(client: Client, channelResolvable: ChannelResolvable, createChannelInviteData: CreateChannelInviteData = {}, reason?: string): Promise<Invite> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const targetUser: string | undefined | null = createChannelInviteData.targetUser ? User.resolveID(createChannelInviteData.targetUser) : null;
    if (targetUser === undefined) throw new Error("Invalid user resolvable for target user");

    // Missing permissions
    if (!client.hasPermission("CREATE_INSTANT_INVITE", channelID)) throw new PermissionError({ permission: "CREATE_INSTANT_INVITE" });

    // Define fetch data
    const path: string = `/channels/${channelID}/invites`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawInviteData = await fetchQueue.request({
        path,
        method,
        data: {
            max_age: createChannelInviteData.maxAge,
            max_uses: createChannelInviteData.maxUses,
            temporary: createChannelInviteData.temporary,
            unique: createChannelInviteData.unique,
            target_type: createChannelInviteData.targetType,
            target_user_id: targetUser || undefined
        },
        auditLogReason: reason
    });

    // Parse invite
    const invite: Invite = Invite._fromRawData(client, result);

    // Return
    return invite;
}