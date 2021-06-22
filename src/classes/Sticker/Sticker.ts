import { Client, RawStickerData, StickerData, StickerFormatType, User } from "../../internal";
import dataFromRawData from "./dataFromRawData";
import fromData from "./fromData";
import toData from "./toData";

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
     */
    packID: string | null;

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
    creator: User | null;

    /**
     * Sort Value
     *
     * The sticker's sort value
     */
    sortValue: number | null;

    /**
     * Sticker
     *
     * @param client The client
     * @param stickerData Options to initialize this sticker with
     * @param stickerData.id The sticker's ID
     * @param stickerData.guildID The ID of the guild this sticker is in
     * @param stickerData.name The sticker's name
     * @param stickerData.description The sticker's description
     * @param stickerData.packID The ID of the pack this sticker is a part of
     * @param stickerData.tags The sticker's tags
     * @param stickerData.formatType The sticker's format type
     * @param stickerData.available Whether or not this sticker is available
     * @param stickerData.creator The user that created this sticker
     * @param stickerData.sortValue The sticker's sort value
     */
    constructor(client: Client, stickerData: StickerData) {

        // Set data
        Object.defineProperty(this, "client", { value: client });
        this.id = stickerData.id;
        this.guildID = stickerData.guildID;
        this.name = stickerData.name;
        this.description = stickerData.description;
        this.packID = stickerData.packID;
        this.tags = stickerData.tags;
        this.formatType = stickerData.formatType;
        this.available = stickerData.available;
        this.creator = stickerData.creator && User.fromData(this.client, stickerData.creator);
        this.sortValue = stickerData.sortValue;
    }

    /**
     * From Raw Data
     *
     * Create a `StickerData` object from a `RawStickerData` object
     *
     * @private
     * @param client The client
     * @param rawData The raw data from the API
     *
     * @returns {Sticker} The sticker
     */
    static _fromRawData(client: Client, rawData: RawStickerData): Sticker {
        return Sticker.fromData(client, Sticker._dataFromRawData(rawData));
    }

    /**
     * Data From Raw Data
     *
     * Create a `StickerData` object from a `RawStickerData` object
     *
     * @private
     * @param rawData The raw data from the API
     *
     * @returns {StickerData} The sticker data
     */
    static _dataFromRawData(rawData: RawStickerData): StickerData {
        return dataFromRawData(rawData);
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

    /**
     * To Data
     *
     * Create a `StickerData` object from a `Sticker`
     *
     * @param sticker The sticker
     *
     * @returns {StickerData} The sticker data
     */
    static toData(sticker: Sticker): StickerData {
        return toData(sticker);
    }
}