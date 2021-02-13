import { ActivityType, Status } from "../../../../internal";

export interface PresenceUpdateData {

    /**
     * User
     *
     * The user that was updated
     */
    user: PresenceUpdateDataUser;

    /**
     * Guild ID
     *
     * The ID of the guild this update happened in
     */
    guildID: string;

    /**
     * Status
     *
     * The status of the user
     */
    status: Status;

    /**
     * Activities
     *
     * The user's activities
     */
    activities: PresenceUpdateDataActivity[];

    /**
     * Client Status
     *
     * The user's statuses
     */
    clientStatus: PresenceUpdateDataClientStatus;
}

export interface PresenceUpdateDataUser {

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
    avatar?: string;

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

export interface PresenceUpdateDataActivity {

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
    url?: string;

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
    timestamps?: PresenceUpdateDataActivityTimestamps;

    /**
     * Application ID
     *
     * The activity's application ID
     */
    applicationID?: string;

    /**
     * Details
     *
     * The activity's details
     */
    details?: string;

    /**
     * State
     *
     * The activity's state
     */
    state?: string;

    /**
     * Emoji
     *
     * The emoji in a custom status
     */
    emoji?: PresenceUpdateDataActivityEmoji;

    /**
     * Party
     *
     * The activity's party
     */
    party?: PresenceUpdateDataActivityParty;

    /**
     * Assets
     *
     * The activity's assets
     */
    assets?: PresenceUpdateDataActivityAssets;

    /**
     * Secrets
     *
     * The activity's secrets
     */
    secrets?: PresenceUpdateDataActivitySecrets;

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
    flags?: number;
}

export interface PresenceUpdateDataActivityTimestamps {

    /**
     * Start
     *
     * The timestamp of when this activity started
     */
    start?: number;

    /**
     * End
     *
     * The timestamp of when this activity ended
     */
    end?: number;
}

export interface PresenceUpdateDataActivityEmoji {

    /**
     * ID
     *
     * The emoji's ID
     */
    id?: string;

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

export interface PresenceUpdateDataActivityParty {

    /**
     * ID
     *
     * The party's ID
     */
    id?: string;

    /**
     * Size
     *
     * The party's current and maximum size
     */
    size?: number[];
}

export interface PresenceUpdateDataActivityAssets {

    /**
     * Large Image
     *
     * The large image's ID
     */
    largeImage?: string;

    /**
     * Large Text
     *
     * The large image's text
     */
    largeText?: string;

    /**
     * Small Image
     *
     * The small image's ID
     */
    smallImage?: string;

    /**
     * Small Text
     *
     * The small image's text
     */
    smallText?: string;
}

export interface PresenceUpdateDataActivitySecrets {

    /**
     * Join
     *
     * The secret for joining a party
     */
    join?: string;

    /**
     * Spectate
     *
     * The secret for spectating a game
     */
    spectate?: string;

    /**
     * Match
     *
     * The secret for the instanced match
     */
    match?: string;
}

export interface PresenceUpdateDataClientStatus {

    /**
     * Desktop
     *
     * The user's status on the desktop app
     */
    desktop?: Status;

    /**
     * Mobile
     *
     * The user's status on the mobile app
     */
    mobile?: Status;

    /**
     * Web
     *
     * The user's status on the web client
     * Bots will have their statuses as web statuses
     */
    web?: Status;
}