import { GuildCreateData, GuildDeleteData } from "../../../../internal";

export interface ReadyData {

    /**
     * API Version
     *
     * The version of the Discord API being used
     */
    apiVersion: number;

    /**
     * User
     *
     * The client's user object
     */
    user: ReadyDataUser;

    /**
     * Session ID
     *
     * The ID for the logged in session
     */
    sessionID: string;

    /**
     * Available Guilds
     *
     * An array of available guilds that the bot is in
     */
    availableGuilds: GuildCreateData[];

    /**
     * Unavailable Guilds
     *
     * An array of unavailable guilds that the bot is in
     */
    unavailableGuilds: GuildDeleteData[];

    /**
     * Application
     *
     * Data about the client's application
     */
    application: ReadyDataApplication;
}

export interface ReadyDataUser {

    /**
     * ID
     *
     * The client's ID
     */
    id: string;

    /**
     * Username
     *
     * The bot's username
     */
    username: string;

    /**
     * Discriminator
     *
     * The bot's discriminator
     */
    discriminator: string;

    /**
     * Avatar
     *
     * The bot's avatar hash
     */
    avatar: string | null;

    /**
     * Flags
     *
     * The flags on the bot's account
     */
    flags: number;
}

export interface ReadyDataApplication {

    /**
     * ID
     *
     * The application's ID
     */
    id: string;

    /**
     * Avatar
     *
     * The application's flags
     */
    flags: number;
}