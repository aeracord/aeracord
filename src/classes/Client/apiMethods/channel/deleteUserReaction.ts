import { Channel, ChannelResolvable, Client, FetchQueue, Message, MessageResolvable, Reaction, ReactionEmojiResolvable, User, UserResolvable } from "../../../../internal";
import getRoute from "../../../../util/getRoute";

export default async function deleteUserReaction(client: Client, channelResolvable: ChannelResolvable, messageResolvable: MessageResolvable, reactionEmojiResolvable: ReactionEmojiResolvable, userResolvable: UserResolvable): Promise<void> {

    // Resolve objects
    const channelID: string = Channel.resolveID(channelResolvable);
    const messageID: string = Message.resolveID(messageResolvable);
    const reactionEmoji: string = Reaction.resolveString(reactionEmojiResolvable);
    const userID: string = User.resolveID(userResolvable);

    // Define fetch data
    const path: string = `/channels/${channelID}/messages/${messageID}/reactions/${encodeURIComponent(reactionEmoji)}/${userID}`;
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