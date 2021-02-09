import { Client } from "../../internal";

export interface UserData {
    id: string;
    username: string;
    discriminator: string;
    avatar?: string;
    bot?: boolean;
    system?: boolean;
    publicFlags: number;
}

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
     * Debug
     *
     * Log debug info
     *
     * @param info Debug info to log
     */
    _debug = (info: string) => this.client._debug(info);
}