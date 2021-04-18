import { AllowedMentions, Client, Embed, FetchQueue, Interaction, InteractionResolvable, Message, Role, RoleResolvable, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface CreateInteractionResponseData {
    type: InteractionResponseType;
    data?: InteractionResponseData;
}

export type InteractionResponseType = typeof INTERACTION_RESPONSE_TYPE_PONG | typeof INTERACTION_RESPONSE_TYPE_MESSAGE | typeof INTERACTION_RESPONSE_TYPE_DEFERRED_MESSAGE;
export const INTERACTION_RESPONSE_TYPE_PONG = 1;
export const INTERACTION_RESPONSE_TYPE_MESSAGE = 4;
export const INTERACTION_RESPONSE_TYPE_DEFERRED_MESSAGE = 5;

export interface InteractionResponseData {
    content?: string;
    tts?: boolean;
    embeds?: Embed[];
    allowedMentions?: AllowedMentions;
    flags?: number;
}

export default async function createInteractionResponse(client: Client, interactionResolvable: InteractionResolvable, interactionToken: string, createInteractionResponseData: CreateInteractionResponseData): Promise<Message> {

    // Resolve objects
    const interactionID: string | undefined = Interaction.resolveID(interactionResolvable);
    if (!interactionID) throw new Error("Invalid interaction resolvable");
    const allowedMentionsUsers: Array<string | undefined> | undefined = createInteractionResponseData.data?.allowedMentions?.users?.map((u: UserResolvable) => User.resolveID(u));
    if (allowedMentionsUsers?.find((u: string | undefined) => !u)) throw new Error("Invalid user resolvable in array of allowed mentions users");
    const allowedMentionsRoles: Array<string | undefined> | undefined = createInteractionResponseData.data?.allowedMentions?.roles?.map((r: RoleResolvable) => Role.resolveID(r));
    if (allowedMentionsRoles?.find((r: string | undefined) => !r)) throw new Error("Invalid role resolvable in array of allowed mentions roles");

    // Define fetch data
    const path: string = `/interactions/${interactionID}/${interactionToken}/callback`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to pending interaction response messages
    const pendingMessage: Promise<Message> = new Promise((resolve) => client._pendingInteractionResponseMessages.set(interactionID, resolve));

    // Add to fetch queue
    await fetchQueue.request({
        path,
        method,
        data: {
            type: createInteractionResponseData.type,
            data: createInteractionResponseData.data && {
                content: createInteractionResponseData.data.content,
                tts: createInteractionResponseData.data.tts,
                embeds: createInteractionResponseData.data.embeds && createInteractionResponseData.data.embeds.map((e: Embed) => e._toJSON()),
                allowed_mentions: createInteractionResponseData.data.allowedMentions && {
                    parse: createInteractionResponseData.data.allowedMentions.parse,
                    users: allowedMentionsUsers,
                    roles: allowedMentionsRoles,
                    replied_user: createInteractionResponseData.data.allowedMentions.repliedUser
                },
                flags: createInteractionResponseData.data.flags
            }
        }
    });

    // Await pending message
    const message: Message = await pendingMessage;

    // Return
    return message;
}