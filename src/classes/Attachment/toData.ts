import { Attachment, AttachmentData } from "../../internal";

export default function toData(attachment: Attachment): AttachmentData {

    // Parse attachment data
    return {
        id: attachment.id,
        messageID: attachment.messageID,
        channelID: attachment.channelID,
        guildID: attachment.guildID,
        filename: attachment.filename,
        contentType: attachment.contentType,
        size: attachment.size,
        url: attachment.url,
        proxyURL: attachment.proxyURL,
        width: attachment.width,
        height: attachment.height
    };
}