/**
 * Embed Data
 *
 * Data for creating an `Embed` object
 */
export interface EmbedData {

    /**
     * Title
     *
     * The embed's title
     */
    title?: string | number | boolean;

    /**
     * Description
     *
     * The embed's description
     */
    description?: string | number | boolean;

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
    footer?: EmbedDataFooter;

    /**
     * Image
     *
     * The embed's image
     */
    image?: string;

    /**
     * Thumbnail
     *
     * The embed's thumbnail
     */
    thumbnail?: string;

    /**
     * Author
     *
     * The embed's author
     */
    author?: EmbedDataAuthor;

    /**
     * Fields
     *
     * The embed's fields
     */
    fields?: EmbedDataField[];

    /**
     * Attachments
     *
     * The embed's attachments
     */
    attachments?: EmbedAttachment[];
}

/**
 * Embed Footer
 *
 * An embed footer
 */
export interface EmbedDataFooter {

    /**
     * Text
     *
     * The footer text
     */
    text: string | number | boolean;

    /**
     * Icon URL
     *
     * The icon URL
     */
    iconURL?: string;
}

/**
 * Embed Author
 *
 * An embed author
 */
export interface EmbedDataAuthor {

    /**
     * Name
     *
     * The embed author's name
     */
    name?: string | number | boolean;

    /**
     * Icon URL
     *
     * The icon URL
     */
    iconURL?: string;

    /**
     * URL
     *
     * The URL
     */
    url?: string;
}

/**
 * Embed Field
 *
 * An embed field
 */
export interface EmbedDataField {

    /**
     * Name
     *
     * The field's name
     */
    name: string | number | boolean;

    /**
     * Value
     *
     * The field's value
     */
    value: string | number | boolean;

    /**
     * Inline
     *
     * Whether or not the field is inline
     */
    inline?: boolean;
}

/**
 * Embed Attachment
 *
 * An embed attachment
 */
export interface EmbedAttachment {

    /**
     * Filename
     *
     * The attachment's filename
     */
    filename: string;

    /**
     * Image
     *
     * The attachment's image
     */
    image: string | Buffer;
}