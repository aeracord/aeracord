import { EmbedAuthor, EmbedData, EmbedField, EmbedFooter } from "../../internal";
import toJSON from "./toJSON";

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
        this.title = embedData?.title;
        this.description = embedData?.description;
        this.url = embedData?.url;
        this.timestamp = embedData?.timestamp;
        this.color = embedData?.color;
        this.footer = embedData?.footer;
        this.image = embedData?.image;
        this.thumbnail = embedData?.thumbnail;
        this.author = embedData?.author;
        this.fields = embedData?.fields || [];
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
    setTitle(title?: string): Embed {
        this.title = title;
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
    setDescription(description?: string): Embed {
        this.description = description;
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
    setFooter(text?: string, iconURL?: string): Embed {
        if (!text) delete this.footer;
        else this.footer = { text, iconURL };
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
    setAuthor(name?: string, iconURL?: string, url?: string): Embed {
        this.author = { name, iconURL, url };
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
    addField(name: string, value: string, inline?: boolean): Embed {
        this.fields.push({ name, value, inline });
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