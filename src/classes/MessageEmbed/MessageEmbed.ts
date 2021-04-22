import { Client, MessageEmbedAuthor, MessageEmbedData, MessageEmbedField, MessageEmbedFooter, MessageEmbedImage, MessageEmbedProvider, MessageEmbedThumbnail, MessageEmbedType, MessageEmbedVideo, RawMessageEmbedData, RawMessageEmbedMetadata } from "../../internal";
import dataFromRawData from "./dataFromRawData";
import fromData from "./fromData";
import toData from "./toData";

export default class MessageEmbed {

    /**
     * Client
     *
     * The client
     */
    client: Client;

    /**
     * Message ID
     *
     * The ID of the message this embed is in
     */
    messageID: string;

    /**
     * Channel ID
     *
     * The ID of the channel this embed is in
     */
    channelID: string;

    /**
     * Guild ID
     *
     * The ID of the guild this embed is in
     */
    guildID?: string | null;

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
    type: MessageEmbedType | null;

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
    footer: MessageEmbedFooter | null;

    /**
     * Image
     *
     * The embed's image
     */
    image: MessageEmbedImage | null;

    /**
     * Thumbnail
     *
     * The embed's thumbnail
     */
    thumbnail: MessageEmbedThumbnail | null;

    /**
     * Video
     *
     * The embed's video
     */
    video: MessageEmbedVideo | null;

    /**
     * Provider
     *
     * The embed's provider
     */
    provider: MessageEmbedProvider | null;

    /**
     * Author
     *
     * The embed's author
     */
    author: MessageEmbedAuthor | null;

    /**
     * Fields
     *
     * The embed's fields
     */
    fields: MessageEmbedField[];

    /**
     * Embed
     *
     * @param client The client
     * @param messageEmbedData Options to initialize this message embed with
     * @param messageEmbedData.title The embed's title
     * @param messageEmbedData.type The embed's type
     * @param messageEmbedData.description The embed's description
     * @param messageEmbedData.url The embed's URL
     * @param messageEmbedData.timestamp The embed's timestamp
     * @param messageEmbedData.color The embed's color
     * @param messageEmbedData.footer The embed's footer
     * @param messageEmbedData.image The embed's image
     * @param messageEmbedData.thumbnail The embed's thumbnail
     * @param messageEmbedData.video The embed's video
     * @param messageEmbedData.provider The embed's provider
     * @param messageEmbedData.author The embed's author
     * @param messageEmbedData.fields The embed's fields
     */
    constructor(client: Client, messageEmbedData: MessageEmbedData) {

        // Set data
        Object.defineProperty(this, "client", {
            value: client,
            enumerable: false
        });
        this.messageID = messageEmbedData.messageID;
        this.channelID = messageEmbedData.channelID;
        this.guildID = messageEmbedData.guildID;
        this.title = messageEmbedData.title;
        this.type = messageEmbedData.type;
        this.description = messageEmbedData.description;
        this.url = messageEmbedData.url;
        this.timestamp = messageEmbedData.timestamp;
        this.color = messageEmbedData.color;
        this.footer = messageEmbedData.footer;
        this.image = messageEmbedData.image;
        this.thumbnail = messageEmbedData.thumbnail;
        this.video = messageEmbedData.video;
        this.provider = messageEmbedData.provider;
        this.author = messageEmbedData.author;
        this.fields = messageEmbedData.fields;
    }

    /**
     * From Raw Data
     *
     * Create a `MessageEmbedData` object from a `RawMessageEmbedData` object
     *
     * @private
     * @param client The client
     * @param rawData The raw data from the API
     * @param metadata Metadata about the object
     *
     * @returns {MessageEmbed} The message embed
     */
    static _fromRawData(client: Client, rawData: RawMessageEmbedData, metadata: RawMessageEmbedMetadata): MessageEmbed {
        return MessageEmbed.fromData(client, MessageEmbed._dataFromRawData(rawData, metadata));
    }

    /**
     * Data From Raw Data
     *
     * Create a `MessageEmbedData` object from a `RawMessageEmbedData` object
     *
     * @private
     * @param rawData The raw data from the API
     * @param metadata Metadata about the object
     *
     * @returns {MessageEmbedData} The message embed data
     */
    static _dataFromRawData(rawData: RawMessageEmbedData, metadata: RawMessageEmbedMetadata): MessageEmbedData {
        return dataFromRawData(rawData, metadata);
    }

    /**
     * From Data
     *
     * Create a `MessageEmbed` from a `MessageEmbedData` object
     *
     * @param client The client
     * @param messageEmbedData The message embed data
     *
     * @returns {Embed} The embed
     */
    static fromData(client: Client, messageEmbedData: MessageEmbedData): MessageEmbed {
        return fromData(client, messageEmbedData);
    }

    /**
     * To Data
     *
     * Create a `MessageEmbedData` object from a `MessageEmbed`
     *
     * @param messageEmbed The message embed
     *
     * @returns {MessageEmbedData} The message embed data
     */
    static toData(messageEmbed: MessageEmbed): MessageEmbedData {
        return toData(messageEmbed);
    }
}