import FormData from "form-data";
import { AllowedMentions, Client, CreateMessageAttachment, CreateMessageFile, Embed, EmbedAttachment, FetchQueue, Interaction, InteractionResolvable, Message, Role, RoleResolvable, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";
import parseAttachments from "../../../util/parseAttachments";

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
    file?: CreateMessageFile;
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

    // Parse attachments
    const files: Array<CreateMessageFile | EmbedAttachment> = [];
    if (createInteractionResponseData.data?.file) files.push(createInteractionResponseData.data.file);
    if (createInteractionResponseData.data?.embeds) createInteractionResponseData.data.embeds.forEach((e: Embed) => files.push(...e.attachments));
    const attachments: CreateMessageAttachment[] = await parseAttachments(files);

    // Parse payload data
    const data: object = {
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
    };

    // Parse form data
    let formData: FormData | undefined;
    if (attachments.length) {

        // Create form data
        formData = new FormData();

        /**
         * Add files
         *
         * If the form data key is `payload_json`, the value should be the payload
         * If the key is anything else, itll be considered a file
         *
         * To upload multiple files, we set the key as the filename
         */
        attachments.forEach((f: CreateMessageAttachment) => (formData as FormData).append(f.filename, f.image, { filename: f.filename }));

        // Add data
        formData.append("payload_json", JSON.stringify(data));
    }

    // Add to pending interaction response messages
    const pendingMessage: Promise<Message> = new Promise((resolve) => client._pendingInteractionResponseMessages.set(interactionID, resolve));

    // Add to fetch queue
    await fetchQueue.request({
        path,
        method,
        contentType: formData ? `multipart/form-data; boundary=${formData?.getBoundary()}` : "application/json",
        data: formData || data
    });

    // Await pending message
    const message: Message = await pendingMessage;

    // Return
    return message;
}