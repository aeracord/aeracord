import { MessageEmbedType } from "../../internal";

export interface RawMessageEmbedData {
    title?: string;
    type?: MessageEmbedType;
    description?: string;
    url?: string;
    timestamp?: string;
    color?: number;
    footer?: RawMessageEmbedDataFooter;
    image?: RawMessageEmbedDataImage;
    thumbnail?: RawMessageEmbedDataThumbnail;
    video?: RawMessageEmbedDataVideo;
    provider?: RawMessageEmbedDataProvider;
    author?: RawMessageEmbedDataAuthor;
    fields?: RawMessageEmbedDataField[];
}

export interface RawMessageEmbedDataFooter {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
}

export interface RawMessageEmbedDataImage {
    url?: string;
    proxy_url?: string;
    width?: number;
    height?: number;
}

export interface RawMessageEmbedDataThumbnail {
    url?: string;
    proxy_url?: string;
    width?: number;
    height?: number;
}

export interface RawMessageEmbedDataVideo {
    url?: string;
    proxy_url?: string;
    width?: number;
    height?: number;
}

export interface RawMessageEmbedDataProvider {
    name?: string;
    url?: string;
}

export interface RawMessageEmbedDataAuthor {
    name?: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
}

export interface RawMessageEmbedDataField {
    name: string;
    value: string;
    inline?: boolean;
}

export interface RawMessageEmbedMetadata {
    messageID: string;
    channelID: string;
    guildID?: string | null;
}