import { Client } from "../../internal";

export interface EmbedData {
    title?: string;
    type?: EmbedType;
    description?: string;
    url?: string;
    timestamp?: number;
    color?: number;
    footer?: EmbedFooter;
    image?: EmbedImage;
    thumbnail?: EmbedThumbnail;
    video?: EmbedVideo;
    provider?: EmbedProvider;
    author?: EmbedAuthor;
    fields: EmbedField[];
}

export type EmbedType = "rich" | "image" | "video" | "gifv" | "article" | "link";

export interface EmbedFooter {
    text: string;
    iconURL?: string;
    proxyIconURL?: string;
}

export interface EmbedImage {
    url?: string;
    proxyURL?: string;
    width?: number;
    height?: number;
}

export interface EmbedThumbnail {
    url?: string;
    proxyURL?: string;
    width?: number;
    height?: number;
}

export interface EmbedVideo {
    url?: string;
    proxyURL?: string;
    width?: number;
    height?: number;
}

export interface EmbedProvider {
    name?: string;
    url?: string;
}

export interface EmbedAuthor {
    name?: string;
    url?: string;
    iconURL?: string;
    proxyIconURL?: string;
}

export interface EmbedField {
    name: string;
    value: string;
    inline: boolean;
}

export default class Embed {

    /**
     * Client
     *
     * The client
     */
    client: Client;

    /**
     * Title
     *
     * The embed's title
     */
    title?: string;

    /**
     * Type
     *
     * The embed's type
     */
    type?: EmbedType;

    /**
     * Description
     *
     * The embed's description
     */
    description?: string;

    /**
     * URL
     *
     * The embed's URL
     */
    url?: string;

    /**
     * Timestamp
     *
     * The embed's timestamp
     */
    timestamp?: number;

    /**
     * Color
     *
     * The embed's color
     */
    color?: number;

    /**
     * Footer
     *
     * The embed's footer
     */
    footer?: EmbedFooter;

    /**
     * Image
     *
     * The embed's image
     */
    image?: EmbedImage;

    /**
     * Thumbnail
     *
     * The embed's thumbnail
     */
    thumbnail?: EmbedThumbnail;

    /**
     * Video
     *
     * The embed's video
     */
    video?: EmbedVideo;

    /**
     * Provider
     *
     * The embed's provider
     */
    provider?: EmbedProvider;

    /**
     * Author
     *
     * The embed's author
     */
    author?: EmbedAuthor;

    /**
     * Fields
     *
     * The embed's fields
     */
    fields: EmbedField[];

    /**
     * Embed
     *
     * @param client The client
     * @param embedData Options to initialize this embed with
     * @param embedData.title The embed's title
     * @param embedData.type The embed's type
     * @param embedData.description The embed's description
     * @param embedData.url The embed's URL
     * @param embedData.timestamp The embed's timestamp
     * @param embedData.color The embed's color
     * @param embedData.footer The embed's footer
     * @param embedData.image The embed's image
     * @param embedData.thumbnail The embed's thumbnail
     * @param embedData.video The embed's video
     * @param embedData.provider The embed's provider
     * @param embedData.author The embed's author
     * @param embedData.fields The embed's fields
     */
    constructor(client: Client, embedData: EmbedData) {

        // Set data
        this.client = client;
        this.title = embedData.title;
        this.type = embedData.type;
        this.description = embedData.description;
        this.url = embedData.url;
        this.timestamp = embedData.timestamp;
        this.color = embedData.color;
        this.footer = embedData.footer;
        this.image = embedData.image;
        this.thumbnail = embedData.thumbnail;
        this.video = embedData.video;
        this.provider = embedData.provider;
        this.author = embedData.author;
        this.fields = embedData.fields;
    }

    /**
     * Debug
     *
     * Log debug info
     *
     * @param info Debug info to log
     */
    _debug = (info: string) => this.client._debug(info);
}