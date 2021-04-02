import { Member, MemberData } from "../../internal";

export default function updateObject(member: Member, memberData: MemberData) {

    // Unmark as deleted
    if (member.deleted) member._unmarkAsDeleted();

    // Set data
    member.guildID = memberData.guildID;
    member.nickname = memberData.nickname;
    member.roles = memberData.roles;
    member.muted = memberData.muted;
    member.deafened = memberData.deafened;
    member.joinedAt = memberData.joinedAt;
    member.premiumSince = memberData.premiumSince;
    member.pending = memberData.pending;
    member.user = memberData.user;
}