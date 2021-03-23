import { Client, RawAttachmentData, RawAttachmentMetadata } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";

export interface AttachmentData {
    id: string;
    messageID: string;
    channelID: string;
    guildID?: string | null;
    filename: string;
    size: number;
    url: string;
    proxyURL: string;
    width: number | null;
    height: number | null;
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
     * Message ID
     *
     * The ID of the message this attachment is in
     */
    messageID: string;

    /**
     * Channel ID
     *
     * The ID of the channel this attachment is in
     */
    channelID: string;

    /**
     * Guild ID
     *
     * The ID of the guild this attachment is in
     */
    guildID?: string | null;

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
    width: number | null;

    /**
     * Height
     *
     * The attachment's height
     */
    height: number | null;

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
        this.messageID = attachmentData.messageID;
        this.channelID = attachmentData.channelID;
        this.guildID = attachmentData.guildID;
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
     * Create an `AttachmentData` object from a `RawAttachmentData` object
     *
     * @param rawData The raw data from the API
     * @param metadata Metadata about the object
     *
     * @returns {AttachmentData} The attachment data
     */
    static _fromRawData(rawData: RawAttachmentData, metadata: RawAttachmentMetadata): AttachmentData {
        return fromRawData(rawData, metadata);
    }

    /**
     * From Data
     *
     * Create an `Attachment` from an `AttachmentData` object
     *
     * @param attachmentData The attachment data
     *
     * @returns {Attachment} The attachment
     */
    static fromData(client: Client, attachmentData: AttachmentData): Attachment {
        return fromData(client, attachmentData);
    }
}