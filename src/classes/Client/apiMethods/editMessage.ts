import FormData from "form-data";
import { AllowedMentions, Channel, ChannelResolvable, Client, Component, CreateMessageAttachment, CreateMessageFile, Embed, EmbedAttachment, FetchQueue, Message, MessageComponent, MessageResolvable, PermissionError, RawMessageData, Role, RoleResolvable, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";
import parseAttachments from "../../../util/parseAttachments";

export interface EditMessageData {
    content?: string;
    embed?: Embed;
    components?: Component[];
    allowedMentions?: AllowedMentions;
    file?: CreateMessageFile;
    flags?: number;
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

    // Parse attachments
    const files: Array<CreateMessageFile | EmbedAttachment> = [];
    if (editMessageData.file) files.push(editMessageData.file);
    if (editMessageData.embed) files.push(...editMessageData.embed.attachments);
    const attachments: CreateMessageAttachment[] = await parseAttachments(files);

    // Parse payload data
    const data: object = {
        content: editMessageData.content,
        embed: editMessageData.embed?._toJSON(),
        components: editMessageData.components && MessageComponent._componentsToJSON(editMessageData.components),
        allowed_mentions: editMessageData.allowedMentions && {
            parse: editMessageData.allowedMentions.parse,
            users: allowedMentionsUsers,
            roles: allowedMentionsRoles,
            replied_user: editMessageData.allowedMentions.repliedUser
        },
        flags: editMessageData.flags
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