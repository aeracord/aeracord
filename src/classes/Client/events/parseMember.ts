import { Client, Member } from "../../../internal";
import parseUser from "./parseUser";
import { RawMemberData } from "./rawMemberData";

export default function parseMember(client: Client, rawData: RawMemberData, guildID: string): Member {

    // Parse member
    const member: Member = new Member(client, {
        guildID,
        nickname: rawData.nick || undefined,
        roles: rawData.roles,
        muted: rawData.mute,
        deafened: rawData.deaf,
        joinedAt: new Date(rawData.joined_at).getTime(),
        premiumSince: rawData.premium_since ? new Date(rawData.premium_since).getTime() : undefined,
        pending: rawData.pending,
        user: parseUser(client, rawData.user)
    });

    // Return
    return member;
}