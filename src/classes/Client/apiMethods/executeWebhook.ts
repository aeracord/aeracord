import FormData from "form-data";
import { BaseCreateMessageData, Client, CreateMessageAttachment, CreateMessageFile, Embed, EmbedAttachment, FetchQueue, Message, MessageComponent, RawMessageData, Role, RoleResolvable, User, UserResolvable, Webhook, WebhookResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";
import parseAttachments from "../../../util/parseAttachments";

export interface CreateWebhookMessageData extends BaseCreateMessageData {
    username?: string;
    avatarURL?: string;
    embeds?: Embed[];
}

export default async function executeWebhook(client: Client, webhookResolvable: WebhookResolvable, webhookToken: string, createWebhookMessageData: CreateWebhookMessageData): Promise<Message> {

    // Resolve objects
    const webhookID: string | undefined = Webhook.resolveID(webhookResolvable);
    if (!webhookID) throw new Error("Invalid webhook resolvable");
    const allowedMentionsUsers: Array<string | undefined> | undefined = createWebhookMessageData.allowedMentions?.users?.map((u: UserResolvable) => User.resolveID(u));
    if (allowedMentionsUsers?.find((u: string | undefined) => !u)) throw new Error("Invalid user resolvable in array of allowed mentions users");
    const allowedMentionsRoles: Array<string | undefined> | undefined = createWebhookMessageData.allowedMentions?.roles?.map((r: RoleResolvable) => Role.resolveID(r));
    if (allowedMentionsRoles?.find((r: string | undefined) => !r)) throw new Error("Invalid role resolvable in array of allowed mentions roles");

    // Define fetch data
    const path: string = `/webhooks/${webhookID}/${webhookToken}?wait=true`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Parse attachments
    const files: Array<CreateMessageFile | EmbedAttachment> = [];
    if (createWebhookMessageData.file) files.push(createWebhookMessageData.file);
    if (createWebhookMessageData.embeds) createWebhookMessageData.embeds.forEach((e: Embed) => files.push(...e.attachments));
    const attachments: CreateMessageAttachment[] = await parseAttachments(files);

    // Parse payload data
    const data: object = {
        content: createWebhookMessageData.content,
        username: createWebhookMessageData.username,
        avatar_url: createWebhookMessageData.avatarURL,
        tts: createWebhookMessageData.tts,
        embeds: createWebhookMessageData.embeds && createWebhookMessageData.embeds.map((e: Embed) => e._toJSON()),
        components: createWebhookMessageData.components && MessageComponent._componentsToJSON(createWebhookMessageData.components),
        allowed_mentions: createWebhookMessageData.allowedMentions && {
            parse: createWebhookMessageData.allowedMentions.parse,
            users: allowedMentionsUsers,
            roles: allowedMentionsRoles,
            replied_user: createWebhookMessageData.allowedMentions.repliedUser
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