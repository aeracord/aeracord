import { Base, Client, ModifyGuildStickerData, RawStickerData, READY_STATE_READY, StickerData, StickerFormatType, StickerType, User } from "../../internal";
import dataFromRawData from "./dataFromRawData";
import fromData from "./fromData";
import resolveID from "./resolveID";
import toData from "./toData";
import updateObject from "./updateObject";
import updateObjectFromData from "./updateObjectFromData";

/**
 * Sticker Resolvable
 *
 * The types that can be resolved to a sticker
 */
export type StickerResolvable = Sticker | StickerData | string;

export default class Sticker extends Base<Sticker> {

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
     * @param stickerData.type The sticker's type
     * @param stickerData.tags The sticker's tags
     * @param stickerData.formatType The sticker's format type
     * @param stickerData.available Whether or not this sticker is available
     * @param stickerData.creator The user that created this sticker
     * @param stickerData.sortValue The sticker's sort value
     */
    constructor(client: Client, stickerData: StickerData) {

        // Super
        super(client, {
            id: stickerData.id,
            cacheManager: client._stickers
        });

        // Set data
        Sticker._updateObject(this, stickerData);

        /**
         * Cache Sticker
         *
         * If we need to cache all stickers and the clients ready state is `READY`
         * The ready state needs to be `READY` since the client might need to fetch data to cache initial objects
         */
        if ((client._stickers.cacheAll) && (client._readyState === READY_STATE_READY)) this.cache();
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

    /**
     * Resolve ID
     *
     * Resolve an object to a sticker ID
     *
     * @param stickerResolvable The sticker resolvable
     *
     * @returns {string | undefined} The resolved sticker ID, or `undefined` if the sticker resolvable is invalid
     */
    static resolveID(stickerResolvable: StickerResolvable): string | undefined {
        return resolveID(stickerResolvable);
    }

    /**
     * Update Object
     *
     * Update the `Sticker` object with data from a `StickerData` object
     *
     * @private
     * @param sticker The sticker to update
     * @param stickerData The data to update this sticker with
     */
    static _updateObject(sticker: Sticker, stickerData: StickerData) {
        updateObject(sticker, stickerData);
    }

    /**
     * Update Object From Data
     *
     * Update the `Sticker` object with data from a `StickerData` object if it's cached
     *
     * @private
     * @param client The client
     * @param stickerData The sticker data
     *
     * @returns {Sticker | undefined} The sticker
     */
    static _updateObjectFromData(client: Client, stickerData: StickerData): Sticker | undefined {
        return updateObjectFromData(client, stickerData);
    }

    /**
     * Cache
     *
     * Cache this `Sticker`
     *
     * @param expiresIn The amount of time for when this object can be garbage collected
     * `null` if it should never expire from cache
     * `undefined` to use the cache manager's default
     */
    cache(expiresIn?: number | null) {
        this.client._stickers.cache(this.id, this, expiresIn);
    }

    /**
     * Edit
     *
     * Edit this sticker
     *
     * @param modifyGuildStickerData The data to modify the sticker
     * @param reason The reason for modifying this sticker
     *
     * @returns {Promise<Sticker>} The modified sticker
     */
    edit(modifyGuildStickerData: ModifyGuildStickerData, reason?: string): Promise<Sticker> {

        // Cant edit a nitro sticker
        if (!this.guildID) throw new Error("Can't edit a Nitro sticker");

        return this.client.modifyGuildSticker(this.guildID, this, modifyGuildStickerData, reason);
    }

    /**
     * Delete
     *
     * Delete this sticker
     *
     * @param reason The reason for deleting this sticker
     */
    delete(reason?: string): Promise<void> {

        // Cant delete a nitro sticker
        if (!this.guildID) throw new Error("Can't delete a Nitro sticker");

        return this.client.deleteGuildSticker(this.guildID, this, reason);
    }
}