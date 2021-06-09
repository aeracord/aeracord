import FormData from "form-data";
import { BaseCreateMessageData, Client, CreateMessageFile, Embed, EmbedAttachment, FetchQueue, Message, MessageComponent, RawMessageData, Role, RoleResolvable, User, UserResolvable, Webhook, WebhookResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";
import parseAttachments, { CreateMessageAttachment } from "../../../util/parseAttachments";
import parseCreateMessageData, { ParsedCreateMessageData } from "../../../util/parseCreateMessageData";

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

    // Parse payload data
    const data: ParsedCreateMessageData = await parseCreateMessageData(createWebhookMessageData, {
        allowedMentionsRoles: allowedMentionsRoles as (string[] | undefined),
        allowedMentionsUsers: allowedMentionsUsers as (string[] | undefined)
    });

    // Add to fetch queue
    const result: RawMessageData = await fetchQueue.request({
        path,
        method,
        contentType: data instanceof FormData ? `multipart/form-data; boundary=${data.getBoundary()}` : "application/json",
        data
    });

    // Parse message
    const message: Message = Message._fromRawData(client, result);

    // Return
    return message;
}