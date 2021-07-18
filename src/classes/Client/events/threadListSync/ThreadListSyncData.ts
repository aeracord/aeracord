import { ThreadChannel, ThreadMember } from "../../../../internal";

export interface ThreadListSyncData {

    /**
     * Guild ID
     *
     * The ID of the guild the threads are in
     */
    guildID: string;

    /**
     * Channel IDs
     *
     * The IDs of the channels whose threads are being synced
     * `undefined` if all the channels in the guild are being synced
     */
    channelIDs?: string[];

    /**
     * Threads
     *
     * The threads that the client can access
     */
    threads: ThreadChannel[];

    /**
     * Thread Members
     *
     * The thread member objects for the threads that the client is a member of
     */
    threadMembers: ThreadMember[];
}