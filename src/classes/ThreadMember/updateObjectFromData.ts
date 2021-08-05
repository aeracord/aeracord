import { Client, ThreadMember, ThreadMemberData } from "../../internal";

export default function updateObjectFromData(client: Client, threadMemberData: ThreadMemberData) {

    // Get thread member from cache
    let threadMember: ThreadMember | undefined = client.threadMembers.get(threadMemberData.threadID, threadMemberData.userID);

    // Update thread member object
    if (threadMember) ThreadMember._updateObject(threadMember, threadMemberData);
}