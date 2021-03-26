import { Base, Client, DMChannelData, Member, RawUserData } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";
import resolveID from "./resolveID";
import updateObject from "./updateObject";

export interface UserData {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
    bot: boolean;
    system: boolean;
    publicFlags: number;
}

export type Status = "online" | "idle" | "dnd" | "offline";

/**
 * Activity types
 * https://discord.com/developers/docs/topics/gateway#activity-object-activity-types
 */
export type ActivityType = typeof ACTIVITY_TYPE_PLAYING | typeof ACTIVITY_TYPE_STREAMING | typeof ACTIVITY_TYPE_LISTENING | typeof ACTIVITY_TYPE_CUSTOM | typeof ACTIVITY_TYPE_COMPETING;
export const ACTIVITY_TYPE_PLAYING = 0;
export const ACTIVITY_TYPE_STREAMING = 1;
export const ACTIVITY_TYPE_LISTENING = 2;
export const ACTIVITY_TYPE_CUSTOM = 4;
export const ACTIVITY_TYPE_COMPETING = 5;

export type UserResolvable = User | Member | string;

export default class User extends Base<User> {

    /**
     * Username
     *
     * The user's username
     */
    username: string;

    /**
     * Discriminator
     *
     * The user's discriminator
     */
    discriminator: string;

    /**
     * Avatar
     *
     * The user's avatar hash
     */
    avatar: string | null;

    /**
     * Bot
     *
     * Whether or not this user is a bot
     */
    bot: boolean;

    /**
     * System
     *
     * Whether or not this user is an official Discord system user
     */
    system: boolean;

    /**
     * Public Flags
     *
     * The public flags on the user's account
     */
    publicFlags: number;

    /**
     * User
     *
     * @param client The client
     * @param userData Options to initialize this user with
     * @param userData.id The user's ID
     * @param userData.username The user's username
     * @param userData.discriminator The user's discriminator
     * @param userData.avatar The user's avatar hash
     * @param userData.bot Whether or not this user is a bot
     * @param userData.system Whether or not this user is an official Discord system user
     * @param userData.publicFlags The public flags on the user's account
     */
    constructor(client: Client, userData: UserData) {

        // Super
        super(client, {
            id: userData.id,
            cacheManager: client._users
        });

        // Set data
        User._updateObject(this, userData);

        // Cache user
        this.client._users.cache(this.id, this);
    }

    /**
     * From Raw Data
     *
     * Create a `UserData` object from a `RawUserData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {UserData} The user data
     */
    static _fromRawData(rawData: RawUserData): UserData {
        return fromRawData(rawData);
    }

    /**
     * From Data
     *
     * Create a `User` from a `UserData` object
     *
     * @param client The client
     * @param userData The user data
     *
     * @returns {User} The user
     */
    static fromData(client: Client, userData: UserData): User {
        return fromData(client, userData);
    }

    /**
     * Resolve ID
     *
     * Resolve an object to a user ID
     *
     * @param userResolvable The user resolvable
     *
     * @returns {string | undefined} The resolved user ID, or `undefined` if the user resolvable is invalid
     */
    static resolveID(userResolvable: UserResolvable): string | undefined {
        return resolveID(userResolvable);
    }

    /**
     * Update Object
     *
     * Update the `User` object with data from a `UserData` object
     *
     * @param user The user to update
     * @param userData The data to update this user with
     */
    static _updateObject(user: User, userData: UserData) {
        updateObject(user, userData);
    }

    /**
     * Create DM
     *
     * Create a DM channel with this user
     *
     * @returns {Promise<DMChannelData>} The DM channel data
     */
    createDM(): Promise<DMChannelData> {
        return this.client.createDM({ recipient: this });
    }
}