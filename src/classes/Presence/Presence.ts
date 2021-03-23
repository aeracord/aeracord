import { ActivityType, Base, Client, RawPresenceData, Status } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";
import updateObject from "./updateObject";

export interface PresenceData {
    user: PresenceUser;
    status: Status;
    activities: Activity[];
    clientStatus: PresenceClientStatus;
}

export interface PresenceUser {

    /**
     * ID
     *
     * The user's ID
     */
    id: string;

    /**
     * Username
     *
     * The user's username
     */
    username?: string;

    /**
     * Discriminator
     *
     * The user's discriminator
     */
    discriminator?: string;

    /**
     * Avatar
     *
     * The user's avatar hash
     */
    avatar?: string | null;

    /**
     * Bot
     *
     * Whether or not this user is a bot
     */
    bot?: boolean;

    /**
     * System
     *
     * Whether or not this user is an official Discord system user
     */
    system?: boolean;

    /**
     * Public Flags
     *
     * The public flags on the user's account
     */
    publicFlags?: number;
}

export interface Activity {

    /**
     * Name
     *
     * The activity's name
     */
    name: string;

    /**
     * Type
     *
     * The activity's type
     */
    type: ActivityType;

    /**
     * URL
     *
     * The stream's URL
     */
    url: string | null;

    /**
     * Created At
     *
     * The timestamp of when this activity started
     */
    createdAt: number;

    /**
     * Timestamps
     *
     * The timestamps for when this activity was started and ended
     */
    timestamps: ActivityTimestamps | null;

    /**
     * Application ID
     *
     * The activity's application ID
     */
    applicationID: string | null;

    /**
     * Details
     *
     * The activity's details
     */
    details: string | null;

    /**
     * State
     *
     * The activity's state
     */
    state: string | null;

    /**
     * Emoji
     *
     * The emoji in a custom status
     */
    emoji: ActivityEmoji | null;

    /**
     * Party
     *
     * The activity's party
     */
    party: ActivityParty | null;

    /**
     * Assets
     *
     * The activity's assets
     */
    assets: ActivityAssets | null;

    /**
     * Secrets
     *
     * The activity's secrets
     */
    secrets: ActivitySecrets | null;

    /**
     * Instance
     *
     * Whether or not this activity is an instanced session
     */
    instance: boolean;

    /**
     * Flags
     *
     * The activity's flags
     */
    flags: number | null;
}

export interface ActivityTimestamps {

    /**
     * Start
     *
     * The timestamp of when this activity started
     */
    start: number | null;

    /**
     * End
     *
     * The timestamp of when this activity ended
     */
    end: number | null;
}

export interface ActivityEmoji {

    /**
     * ID
     *
     * The emoji's ID
     */
    id: string | null;

    /**
     * Name
     *
     * The emoji's name
     */
    name: string;

    /**
     * Animated
     *
     * Whether or not this emoji is animated
     */
    animated: boolean;
}

export interface ActivityParty {

    /**
     * ID
     *
     * The party's ID
     */
    id: string | null;

    /**
     * Size
     *
     * The party's current and maximum size
     */
    size: number[] | null;
}

export interface ActivityAssets {

    /**
     * Large Image
     *
     * The large image's ID
     */
    largeImage: string | null;

    /**
     * Large Text
     *
     * The large image's text
     */
    largeText: string | null;

    /**
     * Small Image
     *
     * The small image's ID
     */
    smallImage: string | null;

    /**
     * Small Text
     *
     * The small image's text
     */
    smallText: string | null;
}

export interface ActivitySecrets {

    /**
     * Join
     *
     * The secret for joining a party
     */
    join: string | null;

    /**
     * Spectate
     *
     * The secret for spectating a game
     */
    spectate: string | null;

    /**
     * Match
     *
     * The secret for the instanced match
     */
    match: string | null;
}

export interface PresenceClientStatus {

    /**
     * Desktop
     *
     * The user's status on the desktop app
     */
    desktop: Status | null;

    /**
     * Mobile
     *
     * The user's status on the mobile app
     */
    mobile: Status | null;

    /**
     * Web
     *
     * The user's status on the web client
     * Bots will have their statuses as web statuses
     */
    web: Status | null;
}

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
    static _fromRawData(rawData: RawPresenceData): PresenceData {
        return fromRawData(rawData);
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
}