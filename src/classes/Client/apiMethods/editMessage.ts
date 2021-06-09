import FormData from "form-data";
import { AllowedMentions, Channel, ChannelResolvable, Client, Component, CreateMessageFile, Embed, FetchQueue, Message, MessageResolvable, PermissionError, RawMessageData, Role, RoleResolvable, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";
import parseCreateMessageData, { ParsedCreateMessageData } from "../../../util/parseCreateMessageData";

export interface BaseEditMessageData {
    content?: string | null;
    components?: Component[] | null;
    allowedMentions?: AllowedMentions | null;
    file?: CreateMessageFile | null;
}

export interface EditMessageData extends BaseEditMessageData {
    embed?: Embed | null;
    flags?: number | null;
}

export default async function editMessage(client: Client, channelResolvable: ChannelResolvable, messageResolvable: MessageResolvable, editMessageData: EditMessageData): Promise<Message> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const messageID: string | undefined = Message.resolveID(messageResolvable);
    if (!messageID) throw new Error("Invalid message resolvable");
    const allowedMentionsUsers: Array<string | undefined> | undefined = editMessageData.allowedMentions?.users?.map((u: UserResolvable) => User.resolveID(u));
    if (allowedMentionsUsers?.find((u: string | undefined) => !u)) throw new Error("Invalid user resolvable in array of allowed mentions users");
    const allowedMentionsRoles: Array<string | undefined> | undefined = editMessageData.allowedMentions?.roles?.map((r: RoleResolvable) => Role.resolveID(r));
    if (allowedMentionsRoles?.find((r: string | undefined) => !r)) throw new Error("Invalid role resolvable in array of allowed mentions roles");

    // Missing permissions
    if (client._cacheStrategies.permissions.enabled) {
        if ((editMessageData.embed) && (!client.hasPermission("EMBED_LINKS", channelID))) throw new PermissionError({ permission: "EMBED_LINKS" });
        if ((editMessageData.file) && (!client.hasPermission("ATTACH_FILES", channelID))) throw new PermissionError({ permission: "ATTACH_FILES" });
    }

    // Define fetch data
    const path: string = `/channels/${channelID}/messages/${messageID}`;
    const method: string = "PATCH";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Parse payload data
    const data: ParsedCreateMessageData = await parseCreateMessageData(editMessageData, {
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