import FormData from "form-data";
import { Channel, ChannelResolvable, Client, Component, Embed, EmbedAttachment, FetchQueue, Message, MessageComponent, PermissionError, RawMessageData, Role, RoleResolvable, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";
import parseAttachments from "../../../util/parseAttachments";

export interface BaseCreateMessageData {
    content?: string;
    tts?: boolean;
    components?: Component[];
    allowedMentions?: AllowedMentions;
    file?: CreateMessageFile;
}

export interface CreateMessageData extends BaseCreateMessageData {
    embed?: Embed;
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

export interface CreateMessageAttachment {
    filename: string;
    image: Buffer;
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
        if ((createMessageData.embed) && (!client.hasPermission("EMBED_LINKS", channelID))) throw new PermissionError({ permission: "EMBED_LINKS" });
        if ((createMessageData.file) && (!client.hasPermission("ATTACH_FILES", channelID))) throw new PermissionError({ permission: "ATTACH_FILES" });
    }

    // Define fetch data
    const path: string = `/channels/${channelID}/messages`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Parse attachments
    const files: Array<CreateMessageFile | EmbedAttachment> = [];
    if (createMessageData.file) files.push(createMessageData.file);
    if (createMessageData.embed) files.push(...createMessageData.embed.attachments);
    const attachments: CreateMessageAttachment[] = await parseAttachments(files);

    // Parse payload data
    const data: object = {
        content: createMessageData.content,
        tts: createMessageData.tts,
        embed: createMessageData.embed?._toJSON(),
        components: createMessageData.components && MessageComponent._componentsToJSON(createMessageData.components),
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