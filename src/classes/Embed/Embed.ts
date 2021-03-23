import { Client, RawEmbedData } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";
import toJSON from "./toJSON";

export interface EmbedData {
    title: string | null;
    type: EmbedType | null;
    description: string | null;
    url: string | null;
    timestamp: number | null;
    color: number | null;
    footer: EmbedFooter | null;
    image: EmbedImage | null;
    thumbnail: EmbedThumbnail | null;
    video: EmbedVideo | null;
    provider: EmbedProvider | null;
    author: EmbedAuthor | null;
    fields: EmbedField[];
}

export type EmbedType = "rich" | "image" | "video" | "gifv" | "article" | "link";

export interface EmbedFooter {
    text: string;
    iconURL: string | null;
    proxyIconURL: string | null;
}

export interface EmbedImage {
    url: string | null;
    proxyURL: string | null;
    width: number | null;
    height: number | null;
}

export interface EmbedThumbnail {
    url: string | null;
    proxyURL: string | null;
    width: number | null;
    height: number | null;
}

export interface EmbedVideo {
    url: string | null;
    proxyURL: string | null;
    width: number | null;
    height: number | null;
}

export interface EmbedProvider {
    name: string | null;
    url: string | null;
}

export interface EmbedAuthor {
    name: string | null;
    url: string | null;
    iconURL: string | null;
    proxyIconURL: string | null;
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
    title: string | null;

    /**
     * Type
     *
     * The embed's type
     */
    type: EmbedType | null;

    /**
     * Description
     *
     * The embed's description
     */
    description: string | null;

    /**
     * URL
     *
     * The embed's URL
     */
    url: string | null;

    /**
     * Timestamp
     *
     * The embed's timestamp
     */
    timestamp: number | null;

    /**
     * Color
     *
     * The embed's color
     */
    color: number | null;

    /**
     * Footer
     *
     * The embed's footer
     */
    footer: EmbedFooter | null;

    /**
     * Image
     *
     * The embed's image
     */
    image: EmbedImage | null;

    /**
     * Thumbnail
     *
     * The embed's thumbnail
     */
    thumbnail: EmbedThumbnail | null;

    /**
     * Video
     *
     * The embed's video
     */
    video: EmbedVideo | null;

    /**
     * Provider
     *
     * The embed's provider
     */
    provider: EmbedProvider | null;

    /**
     * Author
     *
     * The embed's author
     */
    author: EmbedAuthor | null;

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
     * From Raw Data
     *
     * Create an `EmbedData` object from a `RawEmbedData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {EmbedData} The embed data
     */
    static _fromRawData(rawData: RawEmbedData): EmbedData {
        return fromRawData(rawData);
    }

    /**
     * From Data
     *
     * Create an `Embed` from an `EmbedData` object
     *
     * @param embedData The embed data
     *
     * @returns {Embed} The embed
     */
    static fromData(client: Client, embedData: EmbedData): Embed {
        return fromData(client, embedData);
    }

    /**
     * To JSON
     *
     * Convert this embed to a JSON object for sending to the API
     */
    _toJSON(): object {
        return toJSON(this);
    }
}