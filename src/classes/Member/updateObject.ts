import { Member, MemberData } from "../../internal";

export default function updateObject(member: Member, memberData: MemberData) {

    // Set data
    member.guildID = memberData.guildID;
    member.nickname = memberData.nickname;
    member.roles = memberData.roles;
    member.muted = Boolean(memberData.muted);
    member.deafened = Boolean(memberData.deafened);
    member.joinedAt = memberData.joinedAt;
    member.premiumSince = memberData.premiumSince;
    member.pending = Boolean(memberData.pending);
    member.user = memberData.user;
}