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
     * Guilds
     *
     * An array of unavailable guild IDs that the bot is in
     */
    guilds: string[];

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
    flags?: number;
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