import { Client, Member, MemberData } from "../../internal";

export default function updateObjectFromData(client: Client, memberData: MemberData) {

    // Get member from cache
    let member: Member | undefined = client.members.get(memberData.guildID, memberData.user.id);

    // Update member object
    if (member) Member._updateObject(member, memberData);
}