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

        /**
         * Define Cache
         *
         * If we need to cache all bans and the clients ready state is `READY`
         * The ready state needs to be `READY` since the client might need to fetch data to cache initial objects
         */
        const cache: boolean = client._presences.cacheAll && client._readyState === READY_STATE_READY;

        // Super
        super(client, {
            id: presenceData.user.id,
            cacheManager: client._presences,
            expiresFromCacheIn: cache ? (client._presences.cacheFor || null) : undefined
        });

        // Set data
        Presence._updateObject(this, presenceData);

        // Cache presence
        if (cache) this.client._presences.cache(this.id, this);
    }

    /**
     * From Raw Data
     *
     * Create a `PresenceData` object from a `RawPresenceData` object
     *
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
     */
    cache() {
        this.client._presences.cache(this.id, this);
    }
}