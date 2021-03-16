import { AttachmentData, RawAttachmentData } from "../../internal";

export default function fromRawData(rawData: RawAttachmentData): AttachmentData {

    // Parse attachment data
    return {
        id: rawData.id,
        filename: rawData.filename,
        size: rawData.size,
        url: rawData.url,
        proxyURL: rawData.proxy_url,
        width: rawData.width || undefined,
        height: rawData.height || undefined
    };
}