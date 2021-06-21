import FormData from "form-data";
import { Channel, ChannelResolvable, Client, Component, Embed, FetchQueue, Message, PermissionError, RawMessageData, Role, RoleResolvable, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";
import parseCreateMessageData, { ParsedCreateMessageData } from "../../../util/parseCreateMessageData";

export interface BaseCreateMessageData {
    content?: string;
    tts?: boolean;
    embeds?: Embed[];
    components?: Component[];
    allowedMentions?: AllowedMentions;
    file?: CreateMessageFile;
}

export interface CreateMessageData extends BaseCreateMessageData {
    messageReference?: CreateMessageReference;
}

export interface AllowedMentions {
    parse?: AllowedMentionType[];
    users?: UserResolvable[];
    roles?: RoleResolvable[];
    repliedUser?: boolean;
}

export type AllowedMentionType = "users" | "roles" | "everyone";

export interface CreateMessageReference {
    id: string;
    failIfNotExists?: boolean;
}

export interface CreateMessageFile {
    filename: string;
    image: Buffer | string;
}

export default async function createMessage(client: Client, channelResolvable: ChannelResolvable, createMessageData: CreateMessageData): Promise<Message> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const allowedMentionsUsers: Array<string | undefined> | undefined = createMessageData.allowedMentions?.users?.map((u: UserResolvable) => User.resolveID(u));
    if (allowedMentionsUsers?.find((u: string | undefined) => !u)) throw new Error("Invalid user resolvable in array of allowed mentions users");
    const allowedMentionsRoles: Array<string | undefined> | undefined = createMessageData.allowedMentions?.roles?.map((r: RoleResolvable) => Role.resolveID(r));
    if (allowedMentionsRoles?.find((r: string | undefined) => !r)) throw new Error("Invalid role resolvable in array of allowed mentions roles");

    // Missing permissions
    if (client._cacheStrategies.permissions.enabled) {
        if (!client.hasPermission("SEND_MESSAGES", channelID)) throw new PermissionError({ permission: "SEND_MESSAGES" });
        if ((createMessageData.tts) && (!client.hasPermission("SEND_TTS_MESSAGES", channelID))) throw new PermissionError({ permission: "SEND_TTS_MESSAGES" });
        if ((createMessageData.embeds) && (!client.hasPermission("EMBED_LINKS", channelID))) throw new PermissionError({ permission: "EMBED_LINKS" });
        if ((createMessageData.file) && (!client.hasPermission("ATTACH_FILES", channelID))) throw new PermissionError({ permission: "ATTACH_FILES" });
    }

    // Define fetch data
    const path: string = `/channels/${channelID}/messages`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Parse payload data
    const data: ParsedCreateMessageData = await parseCreateMessageData(createMessageData, {
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