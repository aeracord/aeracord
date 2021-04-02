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
export type ActivityType = typeof ACTIVITY_TYPE_PLAYING | typeof ACTIVITY_TYPE_STREAMING | typeof ACTIVITY_TYPE_LISTENING | typeof ACTIVITY_TYPE_CUSTOM | typeof ACTIVITY_TYPE_COMPETING;
export const ACTIVITY_TYPE_PLAYING = 0;
export const ACTIVITY_TYPE_STREAMING = 1;
export const ACTIVITY_TYPE_LISTENING = 2;
export const ACTIVITY_TYPE_CUSTOM = 4;
export const ACTIVITY_TYPE_COMPETING = 5;