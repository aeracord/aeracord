import { Base, Client, DMChannel, Member, MemberData, RawUserData, READY_STATE_READY, UserData } from "../../internal";
import dataFromRawData from "./dataFromRawData";
import fromData from "./fromData";
import resolveID from "./resolveID";
import toData from "./toData";
import updateObject from "./updateObject";
import updateObjectFromData from "./updateObjectFromData";

/**
 * User Resolvable
 *
 * The types that can be resolved to a user
 */
export type UserResolvable = User | UserData | Member | MemberData | string;

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
     * Tag
     *
     * The user's tag
     */
    get tag(): string {
        return `${this.username}#${this.discriminator}`;
    }

    /**
     * Avatar Hash
     *
     * The user's avatar hash
     */
    avatarHash: string | null;

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

        /**
         * Cache User
         *
         * If we need to cache all users and the clients ready state is `READY`
         * The ready state needs to be `READY` since the client might need to fetch data to cache initial objects
         */
        if (client._users.cacheAll && client._readyState === READY_STATE_READY) this.cache();
    }

    /**
     * From Raw Data
     *
     * Create a `User` object from a `RawUserData` object
     *
     * @private
     * @param client The client
     * @param rawData The raw data from the API
     *
     * @returns {User} The user
     */
    static _fromRawData(client: Client, rawData: RawUserData): User {
        return User.fromData(client, User._dataFromRawData(rawData));
    }

    /**
     * Data From Raw Data
     *
     * Create a `UserData` object from a `RawUserData` object
     *
     * @private
     * @param rawData The raw data from the API
     *
     * @returns {UserData} The user data
     */
    static _dataFromRawData(rawData: RawUserData): UserData {
        return dataFromRawData(rawData);
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
     * To Data
     *
     * Create a `UserData` object from a `User`
     *
     * @param user The user
     *
     * @returns {UserData} The user data
     */
    static toData(user: User): UserData {
        return toData(user);
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
     * @private
     * @param user The user to update
     * @param userData The data to update this user with
     */
    static _updateObject(user: User, userData: UserData) {
        updateObject(user, userData);
    }

    /**
     * Update Object From Data
     *
     * Update the `User` object with data from a `UserData` object if it's cached
     *
     * @private
     * @param client The client
     * @param userData The user data
     *
     * @returns {User | undefined} The user
     */
    static _updateObjectFromData(client: Client, userData: UserData): User | undefined {
        return updateObjectFromData(client, userData);
    }

    /**
     * Cache
     *
     * Cache this `User`
     *
     * @param expiresIn The amount of time for when this object can be garbage collected
     * `null` if it should never expire from cache
     * `undefined` to use the cache manager's default
     */
    cache(expiresIn?: number | null) {
        this.client._users.cache(this.id, this, expiresIn);
    }

    /**
     * Avatar URL
     *
     * Get the avatar's URL
     *
     * @param allowGIF Return the GIF version of the avatar if available
     *
     * @returns {string} The avatar's URL
     */
    avatarURL(allowGIF = true): string {
        return this.avatarHash ? `https://cdn.discordapp.com/avatars/${this.id}/${this.avatarHash}.${((allowGIF) && (this.avatarHash.startsWith("a_"))) ? "gif" : "png"}` : `https://cdn.discordapp.com/embed/avatars/${parseInt(this.discriminator) % 5}.png`;
    }

    /**
     * Create DM
     *
     * Create a DM channel with this user
     *
     * @returns {Promise<DMChannel>} The DM channel
     */
    createDM(): Promise<DMChannel> {
        return this.client.createDM({ recipient: this });
    }
}