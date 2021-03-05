import { Client, Member, RawUserData } from "../../internal";
import fromRawData from "./fromRawData";
import resolveID from "./resolveID";

export interface UserData {
    id: string;
    username: string;
    discriminator: string;
    avatar?: string;
    bot?: boolean;
    system?: boolean;
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

export default class User {

    /**
     * Client
     *
     * The client
     */
    client: Client;

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
    avatar?: string;

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

        // Set data
        this.client = client;
        this.id = userData.id;
        this.username = userData.username;
        this.discriminator = userData.discriminator;
        this.avatar = userData.avatar;
        this.bot = Boolean(userData.bot);
        this.system = Boolean(userData.system);
        this.publicFlags = userData.publicFlags;
    }

    /**
     * From Raw Data
     *
     * Create an `User` from a `RawUserData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {User} The user
     */
    static _fromRawData = (client: Client, rawData: RawUserData): User => fromRawData(client, rawData);

    /**
     * Resolve ID
     *
     * Resolve an object to a user ID
     *
     * @param userResolvable The user resolvable
     *
     * @returns {string | undefined} The resolved user ID, or `undefined` if the user resolvable is invalid
     */
    static resolveID = (userResolvable: UserResolvable): string | undefined => resolveID(userResolvable);
}