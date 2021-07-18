import { ThreadMember } from "../../../../internal";

export interface ThreadMembersUpdateData {

    /**
     * ID
     *
     * The ID of the thread
     */
    id: string;

    /**
     * Guild ID
     *
     * The ID of the guild this thread is in
     */
    guildID: string;

    /**
     * Member Count
     *
     * The approximate number of members in this thread
     * This value stops counting at 50
     */
    memberCount: number;

    /**
     * Added Members
     *
     * The thread member objects of the users that were added to the thread
     */
    addedMembers: ThreadMember[];

    /**
     * Removed Member IDs
     *
     * The IDs of the users that were removed from the thread
     */
    removedMemberIDs: string[];
}