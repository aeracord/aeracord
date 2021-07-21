import { Client, ThreadMember, ThreadMemberData } from "../../internal";

export default function fromData(client: Client, threadMemberData: ThreadMemberData): ThreadMember {

    // Update cached thread member
    let threadMember: ThreadMember | undefined = ThreadMember._updateObjectFromData(client, threadMemberData);

    // Create thread member
    if (!threadMember) threadMember = new ThreadMember(client, threadMemberData);

    // Return
    return threadMember;
}