import { Client, Member, MemberData } from "../../internal";

export default function fromRawData(client: Client, memberData: MemberData): Member {

    // Create member
    const member: Member = new Member(client, memberData);

    // Return
    return member;
}