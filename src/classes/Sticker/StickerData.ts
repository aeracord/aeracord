import { UserData } from "../../internal";

/**
 * Sticker Data
 *
 * Represents an `Sticker`
 */
export interface StickerData {

    /**
     * ID
     *
     * The sticker's ID
     */
    id: string;

    /**
     * Guild ID
     *
     * The ID of the guild this sticker is in
     * `null` for Nitro stickers
     */
    guildID: string | null;

    /**
     * Name
     *
     * The sticker's name
     */
    name: string;

    /**
     * Description
     *
     * The sticker's description
     */
    description: string;

    /**
     * Pack ID
     *
     * The ID of the pack this sticker is a part of
     * `null` for guild stickers
     */
    packID: string | null;

    /**
     * Type
     *
     * The sticker's type
     */
    type: StickerType;

    /**
     * Tags
     *
     * A unicode emoji for guild stickers and the sticker's tags for Nitro stickers
     */
    tags: string;

    /**
     * Format Type
     *
     * The sticker's format type
     */
    formatType: StickerFormatType;

    /**
     * Available
     *
     * Whether or not this sticker is available
     * Stickers can be unavailable due to losing server boosts
     */
    available: boolean;

    /**
     * Creator
     *
     * The user that created this sticker
     * Can be `null` for Nitro stickers
     */
    creator: UserData | null;

    /**
     * Sort Value
     *
     * The sticker's sort value
     */
    sortValue: number | null;

    /**
     * Fetched At
     *
     * The timestamp for when this emoji was fetched
     */
    fetchedAt: number;
}

/**
 * Sticker Type
 * https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types
 */
export type StickerType = typeof STICKER_TYPE_STANDARD | typeof STICKER_TYPE_GUILD;
export const STICKER_TYPE_STANDARD = 1;
export const STICKER_TYPE_GUILD = 2;

/**
 * Sticker Format Type
 * https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types
 */
export type StickerFormatType = typeof STICKER_FORMAT_TYPE_PNG | typeof STICKER_FORMAT_TYPE_APNG | typeof STICKER_FORMAT_TYPE_LOTTIE;
export const STICKER_FORMAT_TYPE_PNG = 1;
export const STICKER_FORMAT_TYPE_APNG = 2;
export const STICKER_FORMAT_TYPE_LOTTIE = 3;