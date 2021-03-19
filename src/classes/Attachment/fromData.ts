import { Attachment, AttachmentData, Client } from "../../internal";

export default function fromData(client: Client, attachmentData: AttachmentData): Attachment {

    // Create attachment
    const attachment: Attachment = new Attachment(client, attachmentData);

    // Return
    return attachment;
}