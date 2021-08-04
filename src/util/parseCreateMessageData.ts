import FormData from "form-data";
import { BaseCreateMessageData, BaseEditMessageData, CreateInteractionMessageData, CreateMessageData, CreateMessageFile, CreateWebhookMessageData, EditMessageData, Embed, EmbedAttachment, MessageComponent } from "../internal";
import parseAttachments, { CreateMessageAttachment } from "./parseAttachments";

export interface CreateMessageDataOptions {
    allowedMentionsUsers?: string[];
    allowedMentionsRoles?: string[];
    parseData?: (data: object) => object;
}

export type ParsedCreateMessageData = ParsedData | FormData;

interface ParsedData {
    [key: string]: any;
}

/**
 * Parse Create Message Data
 *
 * Parse data for creating messages before sending them to the API
 *
 * @param createMessageData The data for creating the message
 */
export default async function parseCreateMessageData(createMessageData: BaseCreateMessageData | CreateMessageData | CreateInteractionMessageData | CreateWebhookMessageData | BaseEditMessageData | EditMessageData, createMessageDataOptions: CreateMessageDataOptions): Promise<ParsedCreateMessageData> {

    // Define data
    let data: ParsedData = {
        content: createMessageData.content,
        components: createMessageData.components && MessageComponent._componentsToJSON(createMessageData.components),
        allowed_mentions: createMessageData.allowedMentions && {
            parse: createMessageData.allowedMentions.parse,
            users: createMessageDataOptions.allowedMentionsUsers,
            roles: createMessageDataOptions.allowedMentionsRoles,
            replied_user: createMessageData.allowedMentions.repliedUser
        }
    };

    // Define files
    const files: Array<CreateMessageFile | EmbedAttachment> = [];
    if (createMessageData.file) files.push(createMessageData.file);

    // TTS
    if ("tts" in createMessageData) data.tts = createMessageData.tts;

    // Message reference
    if ("messageReference" in createMessageData) data.message_reference = createMessageData.messageReference && {
        message_id: createMessageData.messageReference.id,
        fail_if_not_exists: createMessageData.messageReference.failIfNotExists
    };

    // Stickers
    if ("stickers" in createMessageData) data.sticker_ids = createMessageData.stickers;

    // Embeds
    if ("embeds" in createMessageData) {

        // If the embed isnt in an array, create an array with the embed
        if (createMessageData.embeds instanceof Embed) createMessageData.embeds = [createMessageData.embeds];

        // Set data
        data.embeds = createMessageData.embeds && createMessageData.embeds.map((e: Embed) => e._toJSON());
        if (createMessageData.embeds) createMessageData.embeds.forEach((e: Embed) => files.push(...e.attachments));
    }

    // Flags
    if ("flags" in createMessageData) data.flags = createMessageData.flags;

    // Username
    if ("username" in createMessageData) data.username = createMessageData.username;

    // Avatar URL
    if ("avatarURL" in createMessageData) data.avatarURL = createMessageData.avatarURL;

    // Parse data
    if (createMessageDataOptions.parseData) data = createMessageDataOptions.parseData(data);

    // Parse attachments
    const attachments: CreateMessageAttachment[] = await parseAttachments(files);

    // Parse form data
    let formData: FormData | undefined;
    if (attachments.length) {

        // Create form data
        formData = new FormData();

        /**
         * Add Files
         *
         * If the form data key is `payload_json`, the value should be the payload
         * If the key is anything else, itll be considered a file
         *
         * To upload multiple files, we set the key as the filename
         */
        attachments.forEach((a: CreateMessageAttachment) => (formData as FormData).append(a.filename, a.image, { filename: a.filename }));

        // Add data
        formData.append("payload_json", JSON.stringify(data));
    }

    // Return
    return formData || data;
}