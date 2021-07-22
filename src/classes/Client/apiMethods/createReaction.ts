import { Channel, ChannelResolvable, Client, FetchQueue, Message, MessageResolvable, PermissionError, Reaction, ReactionEmojiResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function createReaction(client: Client, channelResolvable: ChannelResolvable, messageResolvable: MessageResolvable, reactionEmojiResolvable: ReactionEmojiResolvable): Promise<void> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const messageID: string | undefined = Message.resolveID(messageResolvable);
    if (!messageID) throw new Error("Invalid message resolvable");
    const reactionEmoji: string | undefined = Reaction.resolveString(reactionEmojiResolvable);
    if (!reactionEmoji) throw new Error("Invalid reaction emoji resolvable");

    // Missing permissions
    if (!client.hasPermission("ADD_REACTIONS", channelID)) throw new PermissionError({ permission: "ADD_REACTIONS" });
    if (

        // If the reaction emoji is a custom emoji
        reactionEmoji.includes(":") &&

        // And the emoji isnt in the guild
        client._emojiGuilds.get(reactionEmoji.split(":")[1]) !== client._channelPermissions.get(channelID)?.guildID &&

        // And the client doesnt have the use external emojis permissions
        !client.hasPermission("USE_EXTERNAL_EMOJIS", channelID)
    ) throw new PermissionError({ permission: "USE_EXTERNAL_EMOJIS" });

    // Define fetch data
    const path: string = `/channels/${channelID}/messages/${messageID}/reactions/${encodeURIComponent(reactionEmoji)}/@me`;
    const method: string = "PUT";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    await fetchQueue.request({
        path,
        method
    });
}