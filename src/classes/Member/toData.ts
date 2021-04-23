import { Member, MemberData } from "../../internal";

export default function toData(member: Member): MemberData {

    // Parse member data
    return {
        guildID: member.guildID,
        nickname: member.id,
        roles: member.roles,
        joinedAt: member.joinedAt,
        premiumSince: member.premiumSince,
        pending: member.pending,
        user: member.user,
        fetchedAt: member._lastUpdatedAt
    };
}