import { MemberData, RawMemberData, User } from "../../internal";

export default function fromRawData(rawData: RawMemberData, guildID: string): MemberData {

    // Parse member data
    return {
        guildID,
        nickname: rawData.nick || null,
        roles: rawData.roles,
        muted: rawData.mute,
        deafened: rawData.deaf,
        joinedAt: new Date(rawData.joined_at).getTime(),
        premiumSince: rawData.premium_since ? new Date(rawData.premium_since).getTime() : null,
        pending: rawData.pending || false,
        user: User._fromRawData(rawData.user)
    };
}