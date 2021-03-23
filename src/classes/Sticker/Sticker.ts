import { Client, RawStickerData } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";

export interface StickerData {
    id: string;
    packID: string;
    name: string;
    description: string;
    tags: string | null;
    asset: string;
    previewAsset: string | null;
    formatType: StickerFormatType;
}

export type StickerFormatType = typeof STICKER_FORMAT_TYPE_PNG | typeof STICKER_FORMAT_TYPE_APNG | typeof STICKER_FORMAT_TYPE_LOTTIE;
export const STICKER_FORMAT_TYPE_PNG = 1;
export const STICKER_FORMAT_TYPE_APNG = 2;
export const STICKER_FORMAT_TYPE_LOTTIE = 3;

export default class Sticker {

    /**
     * Client
     *
     * The client
     */
    client: Client;

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

    /**
     * Sticker
     *
     * @param client The client
     * @param stickerData Options to initialize this sticker with
     * @param stickerData.id The sticker's ID
     * @param stickerData.packID The ID of the pack this sticker is a part of
     * @param stickerData.name The sticker's name
     * @param stickerData.description The sticker's description
     * @param stickerData.tags The sticker's tags
     * @param stickerData.asset The sticker's asset hash
     * @param stickerData.previewAsset The sticker's preview asset hash
     * @param stickerData.formatType The sticker's format type
     */
    constructor(client: Client, stickerData: StickerData) {

        // Set data
        this.client = client;
        this.id = stickerData.id;
        this.packID = stickerData.packID;
        this.name = stickerData.name;
        this.description = stickerData.description;
        this.tags = stickerData.tags;
        this.asset = stickerData.asset;
        this.previewAsset = stickerData.previewAsset;
        this.formatType = stickerData.formatType;
    }

    /**
     * From Raw Data
     *
     * Create a `StickerData` object from a `RawStickerData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {StickerData} The sticker data
     */
    static _fromRawData(rawData: RawStickerData): StickerData {
        return fromRawData(rawData);
    }

    /**
     * From Data
     *
     * Create a `Sticker` from a `StickerData` object
     *
     * @param client The client
     * @param stickerData The sticker data
     *
     * @returns {Sticker} The sticker
     */
    static fromData(client: Client, stickerData: StickerData): Sticker {
        return fromData(client, stickerData);
    }
}