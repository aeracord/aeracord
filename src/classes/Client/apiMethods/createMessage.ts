import FormData from "form-data";
import { promises as fs } from "fs";
import { Channel, ChannelResolvable, Client, Embed, FetchQueue, Message, MessageData, RawMessageData, Role, RoleResolvable, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface CreateMessageData {
    content?: string;
    tts?: boolean;
    embed?: Embed;
    allowedMentions?: AllowedMentions;
    messageReference?: CreateMessageReference;
    file?: CreateMessageFile;
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
    file: Buffer | string;
    filename: string;
}

export default async function createMessage(client: Client, channelResolvable: ChannelResolvable, createMessageData: CreateMessageData): Promise<MessageData> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const allowedMentionsUsers: Array<string | undefined> | undefined = createMessageData.allowedMentions?.users?.map((u: UserResolvable) => User.resolveID(u));
    if (allowedMentionsUsers?.find((u: string | undefined) => !u)) throw new Error("Invalid user resolvable in array of allowed mentions users");
    const allowedMentionsRoles: Array<string | undefined> | undefined = createMessageData.allowedMentions?.roles?.map((r: RoleResolvable) => Role.resolveID(r));
    if (allowedMentionsRoles?.find((r: string | undefined) => !r)) throw new Error("Invalid role resolvable in array of allowed mentions roles");

    // Missing permissions
    if (client._cacheStrategies.permissions.enabled) {
        if (!client.hasPermission("SEND_MESSAGES", channelID)) throw new Error("Missing send messages permissions");
        if ((createMessageData.tts) && (!client.hasPermission("SEND_TTS_MESSAGES", channelID))) throw new Error("Missing send TTS messages permissions");
        if ((createMessageData.embed) && (!client.hasPermission("EMBED_LINKS", channelID))) throw new Error("Missing embed links permissions");
        if ((createMessageData.file) && (!client.hasPermission("ATTACH_FILES", channelID))) throw new Error("Missing attach files permissions");
    }

    // Define fetch data
    const path: string = `/channels/${channelID}/messages`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Parse file
    if (typeof createMessageData.file?.file === "string") createMessageData.file.file = await fs.readFile(createMessageData.file.file);

    // Parse payload data
    const data: object = {
        content: createMessageData.content,
        tts: createMessageData.tts,
        embed: createMessageData.embed?._toJSON(),
        allowed_mentions: createMessageData.allowedMentions && {
            parse: createMessageData.allowedMentions.parse,
            users: allowedMentionsUsers,
            roles: allowedMentionsRoles,
            replied_user: createMessageData.allowedMentions.repliedUser
        },
        message_reference: createMessageData.messageReference && {
            message_id: createMessageData.messageReference.id,
            fail_if_not_exists: createMessageData.messageReference.failIfNotExists
        }
    };

    // Parse form data
    let formData: FormData | undefined;
    if (createMessageData.file) {

        // Create form data
        formData = new FormData();

        // Add file
        formData.append("file", createMessageData.file.file, { filename: createMessageData.file.filename });

        // Add data
        formData.append("payload_json", JSON.stringify(data));
    }

    // Add to fetch queue
    const result: RawMessageData = await fetchQueue.request({
        path,
        method,
        contentType: createMessageData.file ? `multipart/form-data; boundary=${formData?.getBoundary()}` : "application/json",
        data: createMessageData.file ? formData : data
    });

    // Parse message data
    const messageData: MessageData = Message._fromRawData(client, result);

    // Return
    return messageData;
}