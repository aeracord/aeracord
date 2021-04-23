export interface RawAttachmentData {
    id: string;
    filename: string;
    content_type?: string;
    size: number;
    url: string;
    proxy_url: string;
    width?: number | null;
    height?: number | null;
}

export interface RawAttachmentMetadata {
    messageID: string;
    channelID: string;
    guildID?: string | null;
}