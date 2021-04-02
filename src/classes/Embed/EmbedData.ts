/**
 * Embed Data
 *
 * Represents an `Embed`
 */
export interface EmbedData {

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
}

/**
 * Embed Type
 * https://discord.com/developers/docs/resources/channel#embed-object-embed-types
 */
export type EmbedType = "rich" | "image" | "video" | "gifv" | "article" | "link";

/**
 * Embed Footer
 *
 * An embed footer
 */
export interface EmbedFooter {

    /**
     * Text
     *
     * The footer text
     */
    text: string;

    /**
     * Icon URL
     *
     * The icon URL
     */
    iconURL: string | null;

    /**
     * Proxy Icon URL
     *
     * The proxied icon URL
     */
    proxyIconURL: string | null;
}

/**
 * Embed Image
 *
 * An embed image
 */
export interface EmbedImage {

    /**
     * URL
     *
     * The URL
     */
    url: string | null;

    /**
     * Proxy URL
     *
     * The proxied URL
     */
    proxyURL: string | null;

    /**
     * Width
     *
     * The width of the image
     */
    width: number | null;

    /**
     * Height
     *
     * The height of the image
     */
    height: number | null;
}

/**
 * Embed Thumbnail
 *
 * An embed thumbnail
 */
export interface EmbedThumbnail {

    /**
     * URL
     *
     * The URL
     */
    url: string | null;

    /**
     * Proxy URL
     *
     * The proxied URL
     */
    proxyURL: string | null;

    /**
     * Width
     *
     * The width of the image
     */
    width: number | null;

    /**
     * Height
     *
     * The height of the image
     */
    height: number | null;
}

/**
 * Embed Video
 *
 * An embed video
 */
export interface EmbedVideo {

    /**
     * URL
     *
     * The URL
     */
    url: string | null;

    /**
     * Proxy URL
     *
     * The proxied URL
     */
    proxyURL: string | null;

    /**
     * Width
     *
     * The width of the image
     */
    width: number | null;

    /**
     * Height
     *
     * The height of the image
     */
    height: number | null;
}

/**
 * Embed Provider
 *
 * An embed provider
 */
export interface EmbedProvider {

    /**
     * Name
     *
     * The embed provider's name
     */
    name: string | null;

    /**
     * URL
     *
     * The URL
     */
    url: string | null;
}

/**
 * Embed Author
 *
 * An embed author
 */
export interface EmbedAuthor {

    /**
     * Name
     *
     * The embed author's name
     */
    name: string | null;

    /**
     * URL
     *
     * The URL
     */
    url: string | null;

    /**
     * Icon URL
     *
     * The icon URL
     */
    iconURL: string | null;

    /**
     * Proxy Icon URL
     *
     * The proxied icon URL
     */
    proxyIconURL: string | null;
}

/**
 * Embed Field
 *
 * An embed field
 */
export interface EmbedField {

    /**
     * Name
     *
     * The field's name
     */
    name: string;

    /**
     * Value
     *
     * The field's value
     */
    value: string;

    /**
     * Inline
     *
     * Whether or not the field is inline
     */
    inline: boolean;
}