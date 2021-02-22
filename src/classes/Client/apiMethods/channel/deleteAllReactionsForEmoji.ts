import { Channel, ChannelResolvable, Client, FetchQueue, Message, MessageResolvable, Reaction, ReactionEmojiResolvable } from "../../../../internal";
import getRoute from "../../../../util/getRoute";

export default async function deleteAllReactionsForEmoji(client: Client, channelResolvable: ChannelResolvable, messageResolvable: MessageResolvable, reactionEmojiResolvable: ReactionEmojiResolvable): Promise<void> {

    // Resolve objects
    const channelID: string = Channel.resolveID(channelResolvable);
    const messageID: string = Message.resolveID(messageResolvable);
    const reactionEmoji: string = Reaction.resolveString(reactionEmojiResolvable);

    // Define fetch data
    const path: string = `/channels/${channelID}/messages/${messageID}/reactions/${encodeURIComponent(reactionEmoji)}`;
    const method: string = "DELETE";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    await fetchQueue.request({
        path,
        method
    });
}