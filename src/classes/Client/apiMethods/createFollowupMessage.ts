import { AllowedMentions, Client, Embed, FetchQueue, Message, MessageData, RawMessageData, Role, RoleResolvable, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface FollowupInteractionResponseData {
    content?: string;
    tts?: boolean;
    embeds?: Embed[];
    allowedMentions?: AllowedMentions;
}

export default async function createFollowupMessage(client: Client, interactionToken: string, followupInteractionResponseData: FollowupInteractionResponseData): Promise<MessageData> {

    // Resolve objects
    const allowedMentionsUsers: Array<string | undefined> | undefined = followupInteractionResponseData.allowedMentions?.users?.map((u: UserResolvable) => User.resolveID(u));
    if (allowedMentionsUsers?.find((u: string | undefined) => !u)) throw new Error("Invalid user resolvable in array of allowed mentions users");
    const allowedMentionsRoles: Array<string | undefined> | undefined = followupInteractionResponseData.allowedMentions?.roles?.map((r: RoleResolvable) => Role.resolveID(r));
    if (allowedMentionsRoles?.find((r: string | undefined) => !r)) throw new Error("Invalid role resolvable in array of allowed mentions roles");

    // Define fetch data
    const path: string = `/webhooks/${client.id}/${interactionToken}`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawMessageData = await fetchQueue.request({
        path,
        method,
        data: {
            content: followupInteractionResponseData.content,
            tts: followupInteractionResponseData.tts,
            embeds: followupInteractionResponseData.embeds && followupInteractionResponseData.embeds.map((e: Embed) => e._toJSON()),
            allowed_mentions: followupInteractionResponseData.allowedMentions && {
                parse: followupInteractionResponseData.allowedMentions.parse,
                users: allowedMentionsUsers,
                roles: allowedMentionsRoles,
                replied_user: followupInteractionResponseData.allowedMentions.repliedUser
            }
        }
    });

    // Parse message data
    const messageData: MessageData = Message._fromRawData(client, result);

    // Return
    return messageData;
}