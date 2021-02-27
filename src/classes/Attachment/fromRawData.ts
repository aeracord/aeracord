import { Attachment, Client, RawAttachmentData } from "../../internal";

export default function fromRawData(client: Client, rawData: RawAttachmentData): Attachment {

    // Parse attachment
    const attachment: Attachment = new Attachment(client, {
        id: rawData.id,
        filename: rawData.filename,
        size: rawData.size,
        url: rawData.url,
        proxyURL: rawData.proxy_url,
        width: rawData.width || undefined,
        height: rawData.height || undefined
    });

    // Return
    return attachment;
}