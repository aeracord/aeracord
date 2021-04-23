import { Member, MemberData } from "../../internal";

export default function updateObject(member: Member, memberData: MemberData) {

    // If the `MemberData` was fetched before the `Member` object was last updated, dont update anything
    if (memberData.fetchedAt < member._lastUpdatedAt) return;

    // Unmark as deleted
    if (member.deleted) member._unmarkAsDeleted();

    // Set data
    member.guildID = memberData.guildID;
    member.nickname = memberData.nickname;
    member.roles = memberData.roles;
    member.joinedAt = memberData.joinedAt;
    member.premiumSince = memberData.premiumSince;
    member.pending = memberData.pending;
    member.user = memberData.user;
    member._lastUpdatedAt = Date.now();
}