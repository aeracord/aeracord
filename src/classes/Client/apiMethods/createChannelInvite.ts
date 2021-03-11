import { Channel, ChannelResolvable, Client, FetchQueue, Invite, RawInviteData, TargetUserType, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface CreateChannelInviteData {
    maxAge?: number;
    maxUses?: number;
    temporary?: boolean;
    unique?: boolean;
    targetUser?: UserResolvable;
    targetUserType?: TargetUserType;
}

export default async function createChannelInvite(client: Client, channelResolvable: ChannelResolvable, createChannelInviteData: CreateChannelInviteData = {}): Promise<Invite> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const targetUser: string | undefined | null = createChannelInviteData.targetUser ? User.resolveID(createChannelInviteData.targetUser) : null;
    if (targetUser === undefined) throw new Error("Invalid user resolvable for target user");

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
            target_user: targetUser || undefined,
            target_user_type: createChannelInviteData.targetUserType
        }
    });

    // Parse invite
    const invite: Invite = Invite._fromRawData(client, result);

    // Return
    return invite;
}