import queryString from "query-string";
import { Channel, ChannelResolvable, Client, FetchQueue, Message, MessageResolvable, RawUserData, Reaction, ReactionEmojiResolvable, User, UserData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface GetReactionsData {
    limit?: number;
    before?: string;
    after?: string;
}

export default async function getReactions(client: Client, channelResolvable: ChannelResolvable, messageResolvable: MessageResolvable, reactionEmojiResolvable: ReactionEmojiResolvable, getReactionsData: GetReactionsData = {}): Promise<UserData[]> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const messageID: string | undefined = Message.resolveID(messageResolvable);
    if (!messageID) throw new Error("Invalid message resolvable");
    const reactionEmoji: string | undefined = Reaction.resolveString(reactionEmojiResolvable);
    if (!reactionEmoji) throw new Error("Invalid reaction emoji resolvable");

    // Missing permissions
    if ((client._cacheStrategies.permissions.enabled) && (!client.hasPermission("VIEW_CHANNEL", channelID))) throw new Error("Missing view channel permissions");

    // Define fetch data
    const path: string = `/channels/${channelID}/messages/${messageID}/reactions/${encodeURIComponent(reactionEmoji)}?${queryString.stringify({
        limit: getReactionsData.limit,
        before: getReactionsData.before,
        after: getReactionsData.after
    })}`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawUserData[] = await fetchQueue.request({
        path,
        method
    });

    // Parse users
    const users: UserData[] = result.map((u: RawUserData) => User._fromRawData(client, u));

    // Return
    return users;
}