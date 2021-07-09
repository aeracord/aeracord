import { Base, Client, RawVanityInviteData, READY_STATE_READY, VanityInviteData } from "../../internal";
import dataFromRawData from "./dataFromRawData";
import fromData from "./fromData";
import toData from "./toData";
import updateObject from "./updateObject";
import updateObjectFromData from "./updateObjectFromData";

export default class VanityInvite extends Base<VanityInvite> {

    /**
     * Guild ID
     *
     * The ID of the guild this vanity invite is for
     */
    get guildID(): string {
        return this.id;
    }

    /**
     * Code
     *
     * The vanity invite's code
     */
    code: string | null;

    /**
     * Uses
     *
     * The amount of times this vanity invite link has been used
     */
    uses: number;

    /**
     * Vanity Invite
     *
     * @param client The client
     * @param vanityInviteData Options to initialize this vanity invite with
     * @param vanityInviteData.guildID The ID of the guild this vanity invite is for
     * @param vanityInviteData.code The vanity invite's code
     * @param vanityInviteData.uses The amount of times this vanity invite link has been used
     */
    constructor(client: Client, vanityInviteData: VanityInviteData) {

        // Super
        super(client, {
            id: vanityInviteData.guildID,
            cacheManager: client._vanityInvites
        });

        // Set data
        VanityInvite._updateObject(this, vanityInviteData);

        /**
         * Cache Vanity Invite
         *
         * If we need to cache all vanity invites and the clients ready state is `READY`
         * The ready state needs to be `READY` since the client might need to fetch data to cache initial objects
         */
        if (client._vanityInvites.cacheAll && client._readyState === READY_STATE_READY) this.cache();
    }

    /**
     * From Raw Data
     *
     * Create a `VanityInviteData` object from a `RawVanityInviteData` object
     *
     * @private
     * @param client The client
     * @param rawData The raw data from the API
     * @param guildID The ID of the guild this vanity invite is for
     *
     * @returns {VanityInvite} The vanity invite
     */
    static _fromRawData(client: Client, rawData: RawVanityInviteData, guildID: string): VanityInvite {
        return VanityInvite.fromData(client, VanityInvite._dataFromRawData(rawData, guildID));
    }

    /**
     * Data From Raw Data
     *
     * Create a `VanityInviteData` object from a `RawVanityInviteData` object
     *
     * @private
     * @param rawData The raw data from the API
     * @param guildID The ID of the guild this vanity invite is in
     *
     * @returns {VanityInviteData} The vanity invite data
     */
    static _dataFromRawData(rawData: RawVanityInviteData, guildID: string): VanityInviteData {
        return dataFromRawData(rawData, guildID);
    }

    /**
     * From Data
     *
     * Create a `VanityInvite` from a `VanityInviteData` object
     *
     * @param client The client
     * @param vanityInviteData The vanity invite data
     *
     * @returns {VanityInvite} The vanity invite
     */
    static fromData(client: Client, vanityInviteData: VanityInviteData): VanityInvite {
        return fromData(client, vanityInviteData);
    }

    /**
     * To Data
     *
     * Create a `VanityInviteData` object from a `VanityInvite`
     *
     * @param vanityInvite The vanity invite
     *
     * @returns {VanityInviteData} The vanity invite data
     */
    static toData(vanityInvite: VanityInvite): VanityInviteData {
        return toData(vanityInvite);
    }

    /**
     * Update Object
     *
     * Update the `VanityInvite` object with data from a `VanityInviteData` object
     *
     * @private
     * @param vanityInvite The vanity invite to update
     * @param vanityInviteData The data to update this vanity invite with
     */
    static _updateObject(vanityInvite: VanityInvite, vanityInviteData: VanityInviteData) {
        updateObject(vanityInvite, vanityInviteData);
    }

    /**
     * Update Object From Data
     *
     * Update the `VanityInvite` object with data from a `VanityInviteData` object if it's cached
     *
     * @private
     * @param client The client
     * @param vanityInviteData The vanity invite data
     *
     * @returns {VanityInvite | undefined} The vanity invite
     */
    static _updateObjectFromData(client: Client, vanityInviteData: VanityInviteData): VanityInvite | undefined {
        return updateObjectFromData(client, vanityInviteData);
    }

    /**
     * Cache
     *
     * Cache this `VanityInvite`
     *
     * @param expiresIn The amount of time for when this object can be garbage collected
     * `null` if it should never expire from cache
     * `undefined` to use the cache manager's default
     */
    cache(expiresIn?: number | null) {
        this.client._vanityInvites.cache(this.id, this, expiresIn);
    }
}