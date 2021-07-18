import { TextBasedChannelData, ThreadChannelType } from "../../internal";

/**
 * Thread Channel Data
 *
 * Represents a `ThreadChannel`
 */
export interface ThreadChannelData extends TextBasedChannelData {

    /**
     * Type
     *
     * The channel's type
     */
    type: ThreadChannelType;

    /**
     * Name
     *
     * The thread's name
     */
    name: string;

    /**
     * Guild ID
     *
     * The ID of the guild this thread is in
     */
    guildID: string;

    /**
     * Parent ID
     *
     * The ID of this thread's parent channel
     */
    parentID: string;

    /**
     * Creator ID
     *
     * The ID of the user that created this thread
     */
    creatorID: string;

    /**
     * Archived
     *
     * Whether or not this thread is archived
     */
    archived: boolean;

    /**
     * Auto Archived Duration
     *
     * The amount of time in minutes after inactivity that this thread will automatically be archived
     */
    autoArchivedDuration: number;

    /**
     * Archived At
     *
     * The timestamp for when this thread's archived status was last updated
     */
    archivedAt?: number;

    /**
     * Locked
     *
     * Whether or not this thread is locked
     */
    locked: boolean;

    /**
     * Message Count
     *
     * The approximate number of messages in this thread
     * This value stops counting at 50
     */
    messageCount: number;

    /**
     * Member Count
     *
     * The approximate number of members in this thread
     * This value stops counting at 50
     */
    memberCount: number;
}

/**
 * Thread Channel Data
 *
 * Represents a `ThreadChannel`
 */
export interface ThreadMember {

    /**
     * ID
     *
     * The thread's ID
     */
    id: string;

    /**
     * User ID
     *
     * The user's ID
     */
    userID: string;

    /**
     * Join Timestamp
     *
     * The timestamp for when this user joined the thread
     */
    joinTimestamp: number;

    /**
     * Flags
     *
     * The user's flags for the thread
     */
    flags: number;
}