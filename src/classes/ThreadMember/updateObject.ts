import { ThreadMember, ThreadMemberData } from "../../internal";

export default function updateObject(threadMember: ThreadMember, threadMemberData: ThreadMemberData) {

    // If the `ThreadMemberData` was fetched before the `ThreadMember` object was last updated, dont update anything
    if (threadMemberData.fetchedAt < threadMember._lastUpdatedAt) return;

    // Unmark as deleted
    if (threadMember.deleted) threadMember._unmarkAsDeleted();

    // Set data
    threadMember.threadID = threadMemberData.threadID;
    threadMember.guildID = threadMemberData.guildID;
    threadMember.userID = threadMemberData.userID;
    threadMember.joinedAt = threadMemberData.joinedAt;
    threadMember.flags = threadMemberData.flags;
    threadMember._lastUpdatedAt = Date.now();
}