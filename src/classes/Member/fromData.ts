import { Client, Member, MemberData } from "../../internal";

export default function fromData(client: Client, memberData: MemberData): Member {

    // Get member from cache
    let member: Member | undefined = client.members.get(memberData.guildID, memberData.user.id);

    // Create member
    if (!member) member = new Member(client, memberData);

    // Return
    return member;
}