import { Activity, Base, Client, PresenceClientStatus, PresenceData, PresenceUser, RawPresenceData, Status } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";
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

        // Cache presence
        this.client._presences.cache(this.id, this);
    }

    /**
     * From Raw Data
     *
     * Create a `PresenceData` object from a `RawPresenceData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {PresenceData} The presence data
     */
    static _fromRawData(client: Client, rawData: RawPresenceData): PresenceData {
        return fromRawData(client, rawData);
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
}