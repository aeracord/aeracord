import { Client, Member, MemberData, RawMemberData, User } from "../../internal";

export default function dataFromRawData(client: Client, rawData: RawMemberData, guildID: string): MemberData {

    // Parse member data
    const memberData: MemberData = {
        guildID,
        nickname: rawData.nick || null,
        roles: [...rawData.roles, guildID],
        joinedAt: new Date(rawData.joined_at).getTime(),
        premiumSince: rawData.premium_since ? new Date(rawData.premium_since).getTime() : null,
        pending: rawData.pending || false,
        user: User._dataFromRawData(client, rawData.user),
        fetchedAt: Date.now()
    };

    // Update cached member
    Member._updateObjectFromData(client, memberData);

    // Return
    return memberData;
}