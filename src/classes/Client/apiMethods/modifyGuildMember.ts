import { Client, FetchQueue, Guild, GuildResolvable, Member, RawMemberData, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface ModifyGuildMemberData {
    nickname?: string | null;
    roles?: string[];
    muted?: boolean;
    deafened?: boolean;
    voiceChannelID?: string | null;
}

export default async function modifyGuildMember(client: Client, guildResolvable: GuildResolvable, userResolvable: UserResolvable, modifyGuildMemberData: ModifyGuildMemberData): Promise<Member> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);
    const userID: string = User.resolveID(userResolvable);

    // Define fetch data
    const path: string = `/guilds/${guildID}/members/${userID}`;
    const method: string = "PATCH";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawMemberData = await fetchQueue.request({
        path,
        method,
        data: {
            nick: modifyGuildMemberData.nickname,
            roles: modifyGuildMemberData.roles,
            mute: modifyGuildMemberData.muted,
            deaf: modifyGuildMemberData.deafened,
            channel_id: modifyGuildMemberData.voiceChannelID
        }
    });

    // Parse member
    const member: Member = Member._fromRawData(client, result, guildID);

    // Return
    return member;
}