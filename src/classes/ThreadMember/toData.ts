import { ThreadMember, ThreadMemberData } from "../../internal";

export default function toData(threadMember: ThreadMember): ThreadMemberData {

    // Parse thread member data
    return {
        threadID: threadMember.threadID,
        guildID: threadMember.guildID,
        userID: threadMember.userID,
        joinedAt: threadMember.joinedAt,
        flags: threadMember.flags,
        fetchedAt: threadMember._lastUpdatedAt
    };
}