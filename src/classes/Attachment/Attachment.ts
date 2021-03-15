import { Client, RawAttachmentData } from "../../internal";
import fromRawData from "./fromRawData";

export interface AttachmentData {
    id: string;
    filename: string;
    size: number;
    url: string;
    proxyURL: string;
    width?: number;
    height?: number;
}

export default class Attachment {

    /**
     * Client
     *
     * The client
     */
    client: Client;

    /**
     * ID
     *
     * The attachment's ID
     */
    id: string;

    /**
     * Filename
     *
     * The attachment's filename
     */
    filename: string;

    /**
     * Size
     *
     * The attachment's size
     */
    size: number;

    /**
     * URL
     *
     * The attachment's URL
     */
    url: string;

    /**
     * Proxy URL
     *
     * The attachment's proxy URL
     */
    proxyURL: string;

    /**
     * Width
     *
     * The attachment's width
     */
    width?: number;

    /**
     * Height
     *
     * The attachment's height
     */
    height?: number;

    /**
     * Attachment
     *
     * @param client The client
     * @param attachmentData Options to initialize this attachment with
     * @param attachmentData.id The attachment's ID
     * @param attachmentData.filename The attachment's filename
     * @param attachmentData.size The attachment's size
     * @param attachmentData.url The attachment's URL
     * @param attachmentData.proxyURL The attachment's proxy URL
     * @param attachmentData.width The attachment's width
     * @param attachmentData.height The attachment's height
     */
    constructor(client: Client, attachmentData: AttachmentData) {

        // Set data
        this.client = client;
        this.id = attachmentData.id;
        this.filename = attachmentData.filename;
        this.size = attachmentData.size;
        this.url = attachmentData.url;
        this.proxyURL = attachmentData.proxyURL;
        this.width = attachmentData.width;
        this.height = attachmentData.height;
    }

    /**
     * From Raw Data
     *
     * Create an `Attachment` from a `RawAttachmentData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {Attachment} The attachment
     */
    static _fromRawData(client: Client, rawData: RawAttachmentData): Attachment {
        return fromRawData(client, rawData);
    }
}