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
export type StickerType = typeof StickerTypes.STANDARD | typeof StickerTypes.GUILD;
export const StickerTypes: {

    /**
     * Standard
     *
     * A Nitro sticker
     */
    STANDARD: 1,

    /**
     * Guild
     *
     * A custom guild sticker
     */
    GUILD: 2
} = {
    STANDARD: 1,
    GUILD: 2
};

/**
 * Sticker Format Type
 * https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types
 */
export type StickerFormatType = typeof StickerFormatTypes.PNG | typeof StickerFormatTypes.APNG | typeof StickerFormatTypes.LOTTIE;
export const StickerFormatTypes: {

    /**
     * PNG
     *
     * A PNG sticker
     */
    PNG: 1,

    /**
     * APNG
     *
     * An APNG sticker
     */
    APNG: 2,

    /**
     * Lottie
     *
     * A lottie sticker
     */
    LOTTIE: 3
} = {
    PNG: 1,
    APNG: 2,
    LOTTIE: 3
};

/**
 * Sticker Pack
 *
 * A sticker pack
 */
export interface StickerPack {

    /**
     * ID
     *
     * The sticker pack's ID
     */
    id: string;

    /**
     * Name
     *
     * The sticker pack's name
     */
    name: string;

    /**
     * Description
     *
     * The sticker pack's description
     */
    description: string;

    /**
     * Stickers
     *
     * The stickers in this sticker pack
     */
    stickers: StickerData[];

    /**
     * Cover Sticker ID
     *
     * The ID of the sticker that's used for this sticker pack's cover
     */
    coverStickerID: string | null;

    /**
     * Banner Asset ID
     *
     * The ID of the sticker pack's banner
     */
    bannerAssetID: string;

    /**
     * SKU ID
     *
     * The ID of the sticker pack's SKU
     */
    skuID: string;
}