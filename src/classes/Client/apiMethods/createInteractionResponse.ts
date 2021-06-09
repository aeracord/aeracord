import FormData from "form-data";
import { BaseCreateMessageData, Client, Embed, FetchQueue, Interaction, InteractionResolvable, Message, Role, RoleResolvable, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";
import parseCreateMessageData, { ParsedCreateMessageData } from "../../../util/parseCreateMessageData";

export interface CreateInteractionResponseData {
    type: InteractionResponseType;
    data?: CreateInteractionMessageData;
}

export type InteractionResponseType = typeof INTERACTION_RESPONSE_TYPE_MESSAGE | typeof INTERACTION_RESPONSE_TYPE_DEFERRED_MESSAGE | typeof INTERACTION_RESPONSE_TYPE_DEFERRED_MESSAGE_UPDATE | typeof INTERACTION_RESPONSE_TYPE_MESSAGE_UPDATE;
export const INTERACTION_RESPONSE_TYPE_MESSAGE = 4;
export const INTERACTION_RESPONSE_TYPE_DEFERRED_MESSAGE = 5;
export const INTERACTION_RESPONSE_TYPE_DEFERRED_MESSAGE_UPDATE = 6;
export const INTERACTION_RESPONSE_TYPE_MESSAGE_UPDATE = 7;

export interface CreateInteractionMessageData extends BaseCreateMessageData {
    embeds?: Embed[];
    flags?: number;
}

export default async function createInteractionResponse(client: Client, interactionResolvable: InteractionResolvable, interactionToken: string, createInteractionResponseData: CreateInteractionResponseData): Promise<Message | undefined> {

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

    // Parse payload data
    const data: ParsedCreateMessageData | undefined = createInteractionResponseData.data && await parseCreateMessageData(createInteractionResponseData.data, {
        allowedMentionsRoles: allowedMentionsRoles as (string[] | undefined),
        allowedMentionsUsers: allowedMentionsUsers as (string[] | undefined),
        parseData: (data: object) => ({
            type: createInteractionResponseData.type,
            data
        })
    });

    // Add to fetch queue
    await fetchQueue.request({
        path,
        method,
        contentType: data instanceof FormData ? `multipart/form-data; boundary=${data.getBoundary()}` : "application/json",
        data
    });

    // Get message
    const message: Message | undefined = await client.getOriginalInteractionResponse(interactionToken);

    // Return
    return message;
}