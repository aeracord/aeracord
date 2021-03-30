import { Client, Member, MemberData } from "../../internal";

export default function fromData(client: Client, memberData: MemberData): Member {

    // Update cached member
    let member: Member | undefined = Member._updateObjectFromData(client, memberData);

    // Create member
    if (!member) member = new Member(client, memberData);

    // Return
    return member;
}