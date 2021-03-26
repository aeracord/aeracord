import { AllowedMentions, Channel, ChannelResolvable, Client, Embed, FetchQueue, Message, MessageData, MessageResolvable, RawMessageData, Role, RoleResolvable, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface EditMessageData {
    content?: string;
    embed?: Embed;
    allowedMentions?: AllowedMentions;
    flags?: number;
}

export default async function editMessage(client: Client, channelResolvable: ChannelResolvable, messageResolvable: MessageResolvable, editMessageData: EditMessageData): Promise<MessageData> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const messageID: string | undefined = Message.resolveID(messageResolvable);
    if (!messageID) throw new Error("Invalid message resolvable");
    const allowedMentionsUsers: Array<string | undefined> | undefined = editMessageData.allowedMentions?.users?.map((u: UserResolvable) => User.resolveID(u));
    if (allowedMentionsUsers?.find((u: string | undefined) => !u)) throw new Error("Invalid user resolvable in array of allowed mentions users");
    const allowedMentionsRoles: Array<string | undefined> | undefined = editMessageData.allowedMentions?.roles?.map((r: RoleResolvable) => Role.resolveID(r));
    if (allowedMentionsRoles?.find((r: string | undefined) => !r)) throw new Error("Invalid role resolvable in array of allowed mentions roles");

    // Define fetch data
    const path: string = `/channels/${channelID}/messages/${messageID}`;
    const method: string = "PATCH";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawMessageData = await fetchQueue.request({
        path,
        method,
        data: {
            content: editMessageData.content,
            embed: editMessageData.embed?._toJSON(),
            allowed_mentions: editMessageData.allowedMentions && {
                parse: editMessageData.allowedMentions.parse,
                users: allowedMentionsUsers,
                roles: allowedMentionsRoles,
                replied_user: editMessageData.allowedMentions.repliedUser
            },
            flags: editMessageData.flags
        }
    });

    // Parse message data
    const messageData: MessageData = Message._fromRawData(client, result);

    // Return
    return messageData;
}