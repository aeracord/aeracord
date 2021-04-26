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
    title?: string;

    /**
     * Description
     *
     * The embed's description
     */
    description?: string;

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
    footer?: EmbedFooter;

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
    author?: EmbedAuthor;

    /**
     * Fields
     *
     * The embed's fields
     */
    fields?: EmbedField[];
}

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
    iconURL?: string;
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
    name?: string;

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
    inline?: boolean;
}