/**
 * Thread Member Data
 *
 * Represents a `ThreadMember`
 */
export interface ThreadMemberData {

    /**
     * Thread ID
     *
     * The ID of the thread channel this thread member is in
     */
    threadID: string;

    /**
     * Guild ID
     *
     * The ID of the guild this thread member is in
     */
    guildID: string;

    /**
     * User ID
     *
     * The user ID of the thread member
     */
    userID: string;

    /**
     * Joined At
     *
     * The timestamp for when the member joined the thread
     */
    joinedAt: number;

    /**
     * Flags
     *
     * The thread member's flags
     */
    flags: number;

    /**
     * Fetched At
     *
     * The timestamp for when this thread member was fetched
     */
    fetchedAt: number;
}