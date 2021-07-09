import { Activity, Base, Client, PresenceClientStatus, PresenceData, PresenceUser, RawPresenceData, READY_STATE_READY, Status } from "../../internal";
import dataFromRawData from "./dataFromRawData";
import fromData from "./fromData";
import toData from "./toData";
import updateObject from "./updateObject";
import updateObjectFromData from "./updateObjectFromData";

export default class Presence extends Base<Presence> {

    /**
     * User
     *
     * The user this presence is for
     */
    user: PresenceUser;

    /**
     * Status
     *
     * The presence's status
     */
    status: Status;

    /**
     * Activities
     *
     * The presence's activities
     */
    activities: Activity[];

    /**
     * Client Status
     *
     * The presence's statuses
     */
    clientStatus: PresenceClientStatus;

    /**
     * Presence
     *
     * @param client The client
     * @param presenceData Options to initialize this presence with
     * @param presenceData.user The user this presence is for
     * @param presenceData.status The presence's status
     * @param presenceData.activities The presence's activities
     * @param presenceData.clientStatus The presence's statuses
     */
    constructor(client: Client, presenceData: PresenceData) {

        // Super
        super(client, {
            id: presenceData.user.id,
            cacheManager: client._presences
        });

        // Set data
        Presence._updateObject(this, presenceData);

        /**
         * Cache Presence
         *
         * If we need to cache all presences and the clients ready state is `READY`
         * The ready state needs to be `READY` since the client might need to fetch data to cache initial objects
         */
        if (client._presences.cacheAll && client._readyState === READY_STATE_READY) this.cache();
    }

    /**
     * From Raw Data
     *
     * Create a `PresenceData` object from a `RawPresenceData` object
     *
     * @private
     * @param client The client
     * @param rawData The raw data from the API
     *
     * @returns {Presence} The presence
     */
    static _fromRawData(client: Client, rawData: RawPresenceData): Presence {
        return Presence.fromData(client, Presence._dataFromRawData(rawData));
    }

    /**
     * Data From Raw Data
     *
     * Create a `PresenceData` object from a `RawPresenceData` object
     *
     * @private
     * @param rawData The raw data from the API
     *
     * @returns {PresenceData} The presence data
     */
    static _dataFromRawData(rawData: RawPresenceData): PresenceData {
        return dataFromRawData(rawData);
    }

    /**
     * From Data
     *
     * Create a `Presence` from a `PresenceData` object
     *
     * @param client The client
     * @param presenceData The presence data
     *
     * @returns {Presence} The presence
     */
    static fromData(client: Client, presenceData: PresenceData): Presence {
        return fromData(client, presenceData);
    }

    /**
     * To Data
     *
     * Create a `PresenceData` object from a `Presence`
     *
     * @param presence The presence
     *
     * @returns {PresenceData} The presence data
     */
    static toData(presence: Presence): PresenceData {
        return toData(presence);
    }

    /**
     * Update Object
     *
     * Update the `Presence` object with data from a `PresenceData` object
     *
     * @private
     * @param presence The presence to update
     * @param presenceData The data to update this presence with
     */
    static _updateObject(presence: Presence, presenceData: PresenceData) {
        updateObject(presence, presenceData);
    }

    /**
     * Update Object From Data
     *
     * Update the `Presence` object with data from a `PresenceData` object if it's cached
     *
     * @private
     * @param client The client
     * @param presenceData The presence data
     *
     * @returns {Presence | undefined} The presence
     */
    static _updateObjectFromData(client: Client, presenceData: PresenceData): Presence | undefined {
        return updateObjectFromData(client, presenceData);
    }

    /**
     * Cache
     *
     * Cache this `Presence`
     *
     * @param expiresIn The amount of time for when this object can be garbage collected
     * `null` if it should never expire from cache
     * `undefined` to use the cache manager's default
     */
    cache(expiresIn?: number | null) {
        this.client._presences.cache(this.id, this, expiresIn);
    }
}