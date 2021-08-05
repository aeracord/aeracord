import { Client, ThreadMember, ThreadMemberData } from "../../internal";

export default function fromData(client: Client, threadMemberData: ThreadMemberData): ThreadMember {

    // Get thread member from cache
    let threadMember: ThreadMember | undefined = client.threadMembers.get(threadMemberData.threadID, threadMemberData.userID);

    // Create thread member
    if (!threadMember) threadMember = new ThreadMember(client, threadMemberData);

    // Return
    return threadMember;
}