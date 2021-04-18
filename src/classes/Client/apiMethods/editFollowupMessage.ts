import { Client, EditInteractionResponseData, Embed, FetchQueue, Message, MessageResolvable, RawMessageData, Role, RoleResolvable, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function editFollowupMessage(client: Client, interactionToken: string, messageResolvable: MessageResolvable, editInteractionResponseData: EditInteractionResponseData): Promise<Message> {

    // Resolve objects
    const messageID: string | undefined = Message.resolveID(messageResolvable);
    if (!messageID) throw new Error("Invalid message resolvable");
    const allowedMentionsUsers: Array<string | undefined> | undefined = editInteractionResponseData.allowedMentions?.users?.map((u: UserResolvable) => User.resolveID(u));
    if (allowedMentionsUsers?.find((u: string | undefined) => !u)) throw new Error("Invalid user resolvable in array of allowed mentions users");
    const allowedMentionsRoles: Array<string | undefined> | undefined = editInteractionResponseData.allowedMentions?.roles?.map((r: RoleResolvable) => Role.resolveID(r));
    if (allowedMentionsRoles?.find((r: string | undefined) => !r)) throw new Error("Invalid role resolvable in array of allowed mentions roles");

    // Define fetch data
    const path: string = `/webhooks/${client.id}/${interactionToken}/messages/${messageID}`;
    const method: string = "PATCH";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawMessageData = await fetchQueue.request({
        path,
        method,
        data: {
            content: editInteractionResponseData.content,
            embeds: editInteractionResponseData.embeds && editInteractionResponseData.embeds.map((e: Embed) => e._toJSON()),
            allowed_mentions: editInteractionResponseData.allowedMentions && {
                parse: editInteractionResponseData.allowedMentions.parse,
                users: allowedMentionsUsers,
                roles: allowedMentionsRoles,
                replied_user: editInteractionResponseData.allowedMentions.repliedUser
            }
        }
    });

    // Parse message
    const message: Message = Message._fromRawData(client, result);

    // Return
    return message;
}