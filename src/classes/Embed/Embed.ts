import { EmbedAttachment, EmbedData, EmbedDataField } from "../../internal";
import toJSON from "./toJSON";

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

export default class Embed {

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
    fields: EmbedField[];

    /**
     * Attachments
     *
     * The embed's attachments
     */
    attachments: EmbedAttachment[];

    /**
     * Embed
     *
     * @param embedData Options to initialize this message embed with
     * @param embedData.title The embed's title
     * @param embedData.description The embed's description
     * @param embedData.url The embed's URL
     * @param embedData.timestamp The embed's timestamp
     * @param embedData.color The embed's color
     * @param embedData.footer The embed's footer
     * @param embedData.image The embed's image
     * @param embedData.thumbnail The embed's thumbnail
     * @param embedData.author The embed's author
     * @param embedData.fields The embed's fields
     */
    constructor(embedData?: EmbedData) {

        // Set data
        this.title = embedData?.title?.toString();
        this.description = embedData?.description?.toString();
        this.url = embedData?.url;
        this.timestamp = embedData?.timestamp;
        this.color = embedData?.color;
        this.footer = embedData?.footer && {
            text: embedData.footer.text.toString(),
            iconURL: embedData.footer.iconURL
        };
        this.image = embedData?.image;
        this.thumbnail = embedData?.thumbnail;
        this.author = embedData?.author && {
            name: embedData.author.name?.toString(),
            url: embedData.author.url,
            iconURL: embedData.author.iconURL
        };
        this.fields = embedData?.fields ? embedData.fields.map((f: EmbedDataField) => ({
            name: f.name.toString(),
            value: f.value.toString(),
            inline: f.inline
        })) : [];
        this.attachments = embedData?.attachments || [];
    }

    /**
     * Set Title
     *
     * Set this embed's title
     *
     * @param title The title
     *
     * @returns {Embed} This embed
     */
    setTitle(title?: string | number | boolean): Embed {
        this.title = title?.toString();
        return this;
    }

    /**
     * Set Description
     *
     * Set this embed's description
     *
     * @param description The description
     *
     * @returns {Embed} This embed
     */
    setDescription(description?: string | number | boolean): Embed {
        this.description = description?.toString();
        return this;
    }

    /**
     * Set URL
     *
     * Set this embed's URL
     *
     * @param url The url
     *
     * @returns {Embed} This embed
     */
    setURL(url?: string): Embed {
        this.url = url;
        return this;
    }

    /**
     * Set Timestamp
     *
     * Set this embed's timestamp
     *
     * @param timestamp The timestamp
     * `null` to remove the timestamp
     * `undefined` to use the current timestamp
     *
     * @returns {Embed} This embed
     */
    setTimestamp(timestamp?: number | null): Embed {
        if (typeof timestamp === "number") this.timestamp = timestamp;
        else if (timestamp === undefined) this.timestamp = Date.now();
        else delete this.timestamp;
        return this;
    }

    /**
     * Set Color
     *
     * Set this embed's color
     *
     * @param color The color
     *
     * @returns {Embed} This embed
     */
    setColor(color?: number): Embed {
        this.color = color;
        return this;
    }

    /**
     * Set Footer
     *
     * Set this embed's footer
     *
     * @param text The footer's text
     * @param iconURL The URL of the footer's icon
     *
     * @returns {Embed} This embed
     */
    setFooter(text?: string | number | boolean, iconURL?: string): Embed {
        if (!text) delete this.footer;
        else this.footer = { text: text.toString(), iconURL };
        return this;
    }

    /**
     * Set Image
     *
     * Set this embed's image
     *
     * @param image The image
     *
     * @returns {Embed} This embed
     */
    setImage(image?: string): Embed {
        this.image = image;
        return this;
    }

    /**
     * Set Thumbnail
     *
     * Set this embed's thumbnail
     *
     * @param thumbnail The thumbnail
     *
     * @returns {Embed} This embed
     */
    setThumbnail(thumbnail?: string): Embed {
        this.thumbnail = thumbnail;
        return this;
    }

    /**
     * Set Author
     *
     * Set this embed's author
     *
     * @param name The author's name
     * @param iconURL The URL of the author's icon
     * @param url The author's URL
     *
     * @returns {Embed} This embed
     */
    setAuthor(name?: string | number | boolean, iconURL?: string, url?: string): Embed {
        this.author = { name: name?.toString(), iconURL, url };
        return this;
    }

    /**
     * Add Field
     *
     * Add a field to this embed
     *
     * @param name The field's name
     * @param value The field's value
     * @param inline Whether or not this field is inline
     *
     * @returns {Embed} This embed
     */
    addField(name: string | number | boolean, value: string | number | boolean, inline?: boolean): Embed {
        this.fields.push({ name: name?.toString(), value: value?.toString(), inline });
        return this;
    }

    /**
     * Attach Image
     *
     * Attach an image to use in this embed
     *
     * @param filename The filename
     * @param image The image
     *
     * @returns {Embed} This embed
     */
    attachImage(filename: string, image: string | Buffer): Embed {
        this.attachments.push({ filename, image });
        return this;
    }

    /**
     * To JSON
     *
     * Convert this embed to a JSON object for sending to the API
     *
     * @private
     */
    _toJSON(): object {
        return toJSON(this);
    }
}