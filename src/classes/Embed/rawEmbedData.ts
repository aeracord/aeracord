import { EmbedType } from "../../internal";

export default interface RawEmbedData {
    title?: string;
    type?: EmbedType;
    description?: string;
    url?: string;
    timestamp?: string;
    color?: number;
    footer?: RawEmbedDataFooter;
    image?: RawEmbedDataImage;
    thumbnail?: RawEmbedDataThumbnail;
    video?: RawEmbedDataVideo;
    provider?: RawEmbedDataProvider;
    author?: RawEmbedDataAuthor;
    fields?: RawEmbedDataField[];
}

export interface RawEmbedDataFooter {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
}

export interface RawEmbedDataImage {
    url?: string;
    proxy_url?: string;
    width?: number;
    height?: number;
}

export interface RawEmbedDataThumbnail {
    url?: string;
    proxy_url?: string;
    width?: number;
    height?: number;
}

export interface RawEmbedDataVideo {
    url?: string;
    proxy_url?: string;
    width?: number;
    height?: number;
}

export interface RawEmbedDataProvider {
    name?: string;
    url?: string;
}

export interface RawEmbedDataAuthor {
    name?: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
}

export interface RawEmbedDataField {
    name: string;
    value: string;
    inline?: boolean;
}