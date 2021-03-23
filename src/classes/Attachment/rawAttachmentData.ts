export default interface RawAttachmentData {
    id: string;
    filename: string;
    size: number;
    url: string;
    proxy_url: string;
    width: number | null;
    height: number | null;
}

export interface RawAttachmentMetadata {
    messageID: string;
    channelID: string;
    guildID?: string | null;
}