/**
 * Attachment Data
 *
 * Represents an `Attachment`
 */
export interface AttachmentData {

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
     */
    width: number | null;

    /**
     * Height
     *
     * The attachment's height
     */
    height: number | null;
}