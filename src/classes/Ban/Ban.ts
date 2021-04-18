import { BanData, Base, Client, RawBanData, UserData } from "../../internal";
import dataFromRawData from "./dataFromRawData";
import fromData from "./fromData";
import toData from "./toData";
import updateObject from "./updateObject";
import updateObjectFromData from "./updateObjectFromData";

export default class Ban extends Base<Ban> {

    /**
     * Guild ID
     *
     * The ID of the guild this ban is in
     */
    guildID: string;

    /**
     * User
     *
     * The user object for the user this ban is for
     */
    user: UserData;

    /**
     * Reason
     *
     * The ban's reason
     */
    reason: string | null;

    /**
     * Ban
     *
     * @param client The client
     * @param banData Options to initialize this ban with
     * @param banData.guildID The ID of the guild this ban is in
     * @param banData.user The user object for the user this ban is for
     * @param banData.reason The ban's reason
     */
    constructor(client: Client, banData: BanData) {

        // Super
        super(client, {
            id: `${banData.guildID}_${banData.user.id}`,
            cacheManager: client._bans._cacheManager,
            expiresFromCacheIn: client._bans.cacheAll ? (client._bans.cacheFor || null) : undefined
        });

        // Set data
        Ban._updateObject(this, banData);

        // Cache ban
        if (client._bans.cacheAll) this.client._bans.cache(this.guildID, this.user.id, this);
    }

    /**
     * From Raw Data
     *
     * Create a `Ban` object from a `RawBanData` object
     *
     * @param client The client
     * @param rawData The raw data from the API
     * @param guildID The ID of the guild this ban is in
     *
     * @returns {Ban} The ban
     */
    static _fromRawData(client: Client, rawData: RawBanData, guildID: string): Ban {
        return Ban.fromData(client, Ban._dataFromRawData(rawData, guildID));
    }

    /**
     * Data From Raw Data
     *
     * Create a `BanData` object from a `RawBanData` object
     *
     * @param rawData The raw data from the API
     * @param guildID The ID of the guild this ban is in
     *
     * @returns {BanData} The ban data
     */
    static _dataFromRawData(rawData: RawBanData, guildID: string): BanData {
        return dataFromRawData(rawData, guildID);
    }

    /**
     * From Data
     *
     * Create a `Ban` from a `BanData` object
     *
     * @param client The client
     * @param banData The ban data
     *
     * @returns {Ban} The ban
     */
    static fromData(client: Client, banData: BanData): Ban {
        return fromData(client, banData);
    }

    /**
     * To Data
     *
     * Create a `BanData` object from a `Ban`
     *
     * @param ban The ban
     *
     * @returns {BanData} The ban data
     */
    static toData(ban: Ban): BanData {
        return toData(ban);
    }

    /**
     * Update Object
     *
     * Update the `Ban` object with data from a `BanData` object
     *
     * @param ban The ban to update
     * @param banData The data to update this ban with
     */
    static _updateObject(ban: Ban, banData: BanData) {
        updateObject(ban, banData);
    }

    /**
     * Update Object From Data
     *
     * Update the `Ban` object with data from a `BanData` object if it's cached
     *
     * @param client The client
     * @param banData The ban data
     *
     * @returns {Ban | undefined} The ban
     */
    static _updateObjectFromData(client: Client, banData: BanData): Ban | undefined {
        return updateObjectFromData(client, banData);
    }
}