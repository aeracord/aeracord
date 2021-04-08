import { Client, EmbedAuthor, EmbedData, EmbedField, EmbedFooter, EmbedImage, EmbedProvider, EmbedThumbnail, EmbedType, EmbedVideo, RawEmbedData, RawEmbedMetadata } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";
import toData from "./toData";
import toJSON from "./toJSON";

export default class Embed {

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
        this.messageID = embedData.messageID;
        this.channelID = embedData.channelID;
        this.guildID = embedData.guildID;
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
     * @param metadata Metadata about the object
     *
     * @returns {EmbedData} The embed data
     */
    static _fromRawData(rawData: RawEmbedData, metadata: RawEmbedMetadata): EmbedData {
        return fromRawData(rawData, metadata);
    }

    /**
     * From Data
     *
     * Create an `Embed` from an `EmbedData` object
     *
     * @param client The client
     * @param embedData The embed data
     *
     * @returns {Embed} The embed
     */
    static fromData(client: Client, embedData: EmbedData): Embed {
        return fromData(client, embedData);
    }

    /**
     * To Data
     *
     * Create an `EmbedData` object from an `Embed`
     *
     * @param embed The embed
     *
     * @returns {EmbedData} The embed data
     */
    static toData(embed: Embed): EmbedData {
        return toData(embed);
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