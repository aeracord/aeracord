import queryString from "query-string";
import { Channel, ChannelResolvable, Client, FetchQueue, Message, MessageResolvable, Reaction, ReactionEmojiResolvable, User } from "../../../../internal";
import getRoute from "../../../../util/getRoute";
import parseUser from "../../events/parseUser";
import { RawUserData } from "../../events/rawUserData";

export interface GetReactionsData {
    limit?: number;
    before?: string;
    after?: string;
}

export default async function getReactions(client: Client, channelResolvable: ChannelResolvable, messageResolvable: MessageResolvable, reactionEmojiResolvable: ReactionEmojiResolvable, getReactionsData: GetReactionsData = {}): Promise<User[]> {

    // Resolve objects
    const channelID: string = Channel.resolveID(channelResolvable);
    const messageID: string = Message.resolveID(messageResolvable);
    const reactionEmoji: string = Reaction.resolveString(reactionEmojiResolvable);

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
    const users: User[] = result.map((u: RawUserData) => parseUser(client, u));

    // Return
    return users;
}