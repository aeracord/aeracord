import FormData from "form-data";
import { AllowedMentions, Client, Component, CreateMessageAttachment, CreateMessageFile, Embed, EmbedAttachment, FetchQueue, Message, MessageComponent, RawMessageData, Role, RoleResolvable, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";
import parseAttachments from "../../../util/parseAttachments";

export interface FollowupInteractionResponseData {
    content?: string;
    tts?: boolean;
    embeds?: Embed[];
    components?: Component[];
    allowedMentions?: AllowedMentions;
    file?: CreateMessageFile;
}

export default async function createFollowupMessage(client: Client, interactionToken: string, followupInteractionResponseData: FollowupInteractionResponseData): Promise<Message> {

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

    // Parse attachments
    const files: Array<CreateMessageFile | EmbedAttachment> = [];
    if (followupInteractionResponseData.file) files.push(followupInteractionResponseData.file);
    if (followupInteractionResponseData.embeds) followupInteractionResponseData.embeds.forEach((e: Embed) => files.push(...e.attachments));
    const attachments: CreateMessageAttachment[] = await parseAttachments(files);

    // Parse payload data
    const data: object = {
        content: followupInteractionResponseData.content,
        tts: followupInteractionResponseData.tts,
        embeds: followupInteractionResponseData.embeds && followupInteractionResponseData.embeds.map((e: Embed) => e._toJSON()),
        components: followupInteractionResponseData.components && MessageComponent._componentsToJSON(followupInteractionResponseData.components),
        allowed_mentions: followupInteractionResponseData.allowedMentions && {
            parse: followupInteractionResponseData.allowedMentions.parse,
            users: allowedMentionsUsers,
            roles: allowedMentionsRoles,
            replied_user: followupInteractionResponseData.allowedMentions.repliedUser
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

    // Add to fetch queue
    const result: RawMessageData = await fetchQueue.request({
        path,
        method,
        contentType: formData ? `multipart/form-data; boundary=${formData?.getBoundary()}` : "application/json",
        data: formData || data
    });

    // Parse message
    const message: Message = Message._fromRawData(client, result);

    // Return
    return message;
}