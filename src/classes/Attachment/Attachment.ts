import { AttachmentData, Client, RawAttachmentData, RawAttachmentMetadata } from "../../internal";
import dataFromRawData from "./dataFromRawData";
import fromData from "./fromData";
import toData from "./toData";

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
     * `null` if the attachment is sent in a DM channel
     */
    guildID?: string | null;

    /**
     * Filename
     *
     * The attachment's filename
     */
    filename: string;

    /**
     * Content Type
     *
     * The attachment's content type
     */
    contentType?: string;

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
     * `null` if the attachment isn't an image or video
     */
    width: number | null;

    /**
     * Height
     *
     * The attachment's height
     * `null` if the attachment isn't an image or video
     */
    height: number | null;

    /**
     * Attachment
     *
     * @param client The client
     * @param attachmentData Options to initialize this attachment with
     * @param attachmentData.id The attachment's ID
     * @param attachmentData.filename The attachment's filename
     * @param attachmentData.contentType The attachment's content type
     * @param attachmentData.size The attachment's size
     * @param attachmentData.url The attachment's URL
     * @param attachmentData.proxyURL The attachment's proxy URL
     * @param attachmentData.width The attachment's width
     * @param attachmentData.height The attachment's height
     */
    constructor(client: Client, attachmentData: AttachmentData) {

        // Set data
        Object.defineProperty(this, "client", { value: client });
        this.id = attachmentData.id;
        this.messageID = attachmentData.messageID;
        this.channelID = attachmentData.channelID;
        this.guildID = attachmentData.guildID;
        this.filename = attachmentData.filename;
        this.contentType = attachmentData.contentType;
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
     * @private
     * @param client The client
     * @param rawData The raw data from the API
     * @param metadata Metadata about the object
     *
     * @returns {Attachment} The attachment
     */
    static _fromRawData(client: Client, rawData: RawAttachmentData, metadata: RawAttachmentMetadata): Attachment {
        return Attachment.fromData(client, Attachment._dataFromRawData(rawData, metadata));
    }

    /**
     * Data From Raw Data
     *
     * Create an `AttachmentData` object from a `RawAttachmentData` object
     *
     * @private
     * @param rawData The raw data from the API
     * @param metadata Metadata about the object
     *
     * @returns {AttachmentData} The attachment data
     */
    static _dataFromRawData(rawData: RawAttachmentData, metadata: RawAttachmentMetadata): AttachmentData {
        return dataFromRawData(rawData, metadata);
    }

    /**
     * From Data
     *
     * Create an `Attachment` from an `AttachmentData` object
     *
     * @param client The client
     * @param attachmentData The attachment data
     *
     * @returns {Attachment} The attachment
     */
    static fromData(client: Client, attachmentData: AttachmentData): Attachment {
        return fromData(client, attachmentData);
    }

    /**
     * To Data
     *
     * Create an `AttachmentData` object from an `Attachment`
     *
     * @param attachment The attachment
     *
     * @returns {AttachmentData} The attachment data
     */
    static toData(attachment: Attachment): AttachmentData {
        return toData(attachment);
    }
}