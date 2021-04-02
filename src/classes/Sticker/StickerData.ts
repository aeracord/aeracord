/**
 * Sticker Data
 *
 * Represents a `Sticker`
 */
export interface StickerData {

    /**
     * ID
     *
     * The sticker's ID
     */
    id: string;

    /**
     * Pack ID
     *
     * The ID of the pack this sticker is a part of
     */
    packID: string;

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
     * Tags
     *
     * The sticker's tags
     */
    tags: string | null;

    /**
     * Asset
     *
     * The sticker's asset hash
     */
    asset: string;

    /**
     * Preview Asset
     *
     * The sticker's preview asset hash
     */
    previewAsset: string | null;

    /**
     * Format Type
     *
     * The sticker's format type
     */
    formatType: StickerFormatType;
}

/**
 * Sticker Format Type
 * https://discord.com/developers/docs/resources/channel#message-object-message-sticker-format-types
 */
export type StickerFormatType = typeof STICKER_FORMAT_TYPE_PNG | typeof STICKER_FORMAT_TYPE_APNG | typeof STICKER_FORMAT_TYPE_LOTTIE;
export const STICKER_FORMAT_TYPE_PNG = 1;
export const STICKER_FORMAT_TYPE_APNG = 2;
export const STICKER_FORMAT_TYPE_LOTTIE = 3;