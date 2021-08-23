/**
 * User Data
 *
 * Represents a `User`
 */
export interface UserData {

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
     * Avatar Hash
     *
     * The user's avatar hash
     */
    avatarHash: string | null;

    /**
     * Banner Hash
     *
     * The user's banner hash
     */
    bannerHash: string | null;

    /**
     * Accent Color
     *
     * The user's accent color
     */
    accentColor: number | null;

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
     * Fetched At
     *
     * The timestamp for when this user was fetched
     */
    fetchedAt: number;
}

/**
 * Status
 *
 * The statuses a user can have, ie. online, idle, dnd, etc.
 */
export type Status = "online" | "idle" | "dnd" | "offline";

/**
 * Activity Type
 * https://discord.com/developers/docs/topics/gateway#activity-object-activity-types
 */
export type ActivityType = typeof ActivityTypes.PLAYING | typeof ActivityTypes.STREAMING | typeof ActivityTypes.LISTENING | typeof ActivityTypes.WATCHING | typeof ActivityTypes.CUSTOM | typeof ActivityTypes.COMPETING;
export const ActivityTypes: {

    /**
     * Playing
     *
     * A playing activity
     */
    PLAYING: 0,

    /**
     * Streaming
     *
     * A streaming activity
     */
    STREAMING: 1,

    /**
     * Listening
     *
     * A listening activity
     */
    LISTENING: 2,

    /**
     * Watching
     *
     * A watching activity
     */
    WATCHING: 3,

    /**
     * Custom
     *
     * A custom activity
     */
    CUSTOM: 4,

    /**
     * Competing
     *
     * A competing activity
     */
    COMPETING: 5
} = {
    PLAYING: 0,
    STREAMING: 1,
    LISTENING: 2,
    WATCHING: 3,
    CUSTOM: 4,
    COMPETING: 5
};