import queryString from "query-string";
import { Channel, ChannelResolvable, Client, FetchQueue, Message, MessageResolvable, PermissionError, RawUserData, Reaction, ReactionEmojiResolvable, User } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface GetReactionsData {
    limit?: number;
    before?: string;
    after?: string;
}

export default async function getReactions(client: Client, channelResolvable: ChannelResolvable, messageResolvable: MessageResolvable, reactionEmojiResolvable: ReactionEmojiResolvable, getReactionsData: GetReactionsData = {}): Promise<User[]> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const messageID: string | undefined = Message.resolveID(messageResolvable);
    if (!messageID) throw new Error("Invalid message resolvable");
    const reactionEmoji: string | undefined = Reaction.resolveString(reactionEmojiResolvable);
    if (!reactionEmoji) throw new Error("Invalid reaction emoji resolvable");

    // Missing permissions
    if (!client.hasPermission("VIEW_CHANNEL", channelID)) throw new PermissionError({ permission: "VIEW_CHANNEL" });

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
    const users: User[] = result.map((u: RawUserData) => User._fromRawData(client, u));

    // Return
    return users;
}