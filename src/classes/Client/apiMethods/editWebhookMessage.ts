import FormData from "form-data";
import { AllowedMentions, Client, Component, CreateMessageAttachment, CreateMessageFile, Embed, EmbedAttachment, FetchQueue, Message, MessageComponent, MessageResolvable, RawMessageData, Role, RoleResolvable, User, UserResolvable, Webhook, WebhookResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";
import parseAttachments from "../../../util/parseAttachments";

export interface EditWebhookMessageData {
    content?: string;
    embeds?: Embed[];
    components?: Component[];
    allowedMentions?: AllowedMentions;
    file?: CreateMessageFile;
}

export default async function editWebhookMessage(client: Client, webhookResolvable: WebhookResolvable, webhookToken: string, messageResolvable: MessageResolvable, editWebhookMessageData: EditWebhookMessageData): Promise<Message> {

    // Resolve objects
    const webhookID: string | undefined = Webhook.resolveID(webhookResolvable);
    if (!webhookID) throw new Error("Invalid webhook resolvable");
    const messageID: string | undefined = Message.resolveID(messageResolvable);
    if (!messageID) throw new Error("Invalid message resolvable");
    const allowedMentionsUsers: Array<string | undefined> | undefined = editWebhookMessageData.allowedMentions?.users?.map((u: UserResolvable) => User.resolveID(u));
    if (allowedMentionsUsers?.find((u: string | undefined) => !u)) throw new Error("Invalid user resolvable in array of allowed mentions users");
    const allowedMentionsRoles: Array<string | undefined> | undefined = editWebhookMessageData.allowedMentions?.roles?.map((r: RoleResolvable) => Role.resolveID(r));
    if (allowedMentionsRoles?.find((r: string | undefined) => !r)) throw new Error("Invalid role resolvable in array of allowed mentions roles");

    // Define fetch data
    const path: string = `/webhooks/${webhookID}/${webhookToken}/messages/${messageID}`;
    const method: string = "PATCH";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Parse attachments
    const files: Array<CreateMessageFile | EmbedAttachment> = [];
    if (editWebhookMessageData.file) files.push(editWebhookMessageData.file);
    if (editWebhookMessageData.embeds) editWebhookMessageData.embeds.forEach((e: Embed) => files.push(...e.attachments));
    const attachments: CreateMessageAttachment[] = await parseAttachments(files);

    // Parse payload data
    const data: object = {
        content: editWebhookMessageData.content,
        embeds: editWebhookMessageData.embeds && editWebhookMessageData.embeds.map((e: Embed) => e._toJSON()),
        components: editWebhookMessageData.components && MessageComponent._componentsToJSON(editWebhookMessageData.components),
        allowed_mentions: editWebhookMessageData.allowedMentions && {
            parse: editWebhookMessageData.allowedMentions.parse,
            users: allowedMentionsUsers,
            roles: allowedMentionsRoles,
            replied_user: editWebhookMessageData.allowedMentions.repliedUser
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