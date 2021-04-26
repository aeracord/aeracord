/**
 * Message Embed Data
 *
 * Represents an `MessageEmbed`
 */
export interface MessageEmbedData {

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
}

/**
 * Message Embed Type
 * https://discord.com/developers/docs/resources/channel#embed-object-embed-types
 */
export type MessageEmbedType = "rich" | "image" | "video" | "gifv" | "article" | "link";

/**
 * Message Embed Footer
 *
 * A message embed footer
 */
export interface MessageEmbedFooter {

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
 * Message Embed Image
 *
 * A message embed image
 */
export interface MessageEmbedImage {

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
 * Message Embed Thumbnail
 *
 * A message embed thumbnail
 */
export interface MessageEmbedThumbnail {

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
 * Message Embed Video
 *
 * A message embed video
 */
export interface MessageEmbedVideo {

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
 * Message Embed Provider
 *
 * A message embed provider
 */
export interface MessageEmbedProvider {

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
 * Message Embed Author
 *
 * A message embed author
 */
export interface MessageEmbedAuthor {

    /**
     * Name
     *
     * The embed author's name
     */
    name: string | null;

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

    /**
     * URL
     *
     * The URL
     */
    url: string | null;
}

/**
 * Message Embed Field
 *
 * A message embed field
 */
export interface MessageEmbedField {

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