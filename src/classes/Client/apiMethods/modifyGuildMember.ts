import { Channel, ChannelResolvable, Client, FetchQueue, Guild, GuildResolvable, Member, RawMemberData, Role, RoleResolvable, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface ModifyGuildMemberData {
    nickname?: string | null;
    roles?: RoleResolvable[];
    muted?: boolean;
    deafened?: boolean;
    voiceChannelID?: ChannelResolvable | null;
}

export default async function modifyGuildMember(client: Client, guildResolvable: GuildResolvable, userResolvable: UserResolvable, modifyGuildMemberData: ModifyGuildMemberData): Promise<Member> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const userID: string | undefined = User.resolveID(userResolvable);
    if (!userID) throw new Error("Invalid user resolvable");
    const roles: Array<string | undefined> | undefined = modifyGuildMemberData.roles?.map((r: RoleResolvable) => Role.resolveID(r));
    if (roles?.find((r: string | undefined) => !r)) throw new Error("Invalid role resolvable in array of roles");
    const voiceChannelID: string | undefined | null = modifyGuildMemberData.voiceChannelID ? Channel.resolveID(modifyGuildMemberData.voiceChannelID) : null;
    if ((voiceChannelID === undefined) && (modifyGuildMemberData.voiceChannelID !== undefined)) throw new Error("Invalid channel resolvable for voice channel");

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
            roles: roles,
            mute: modifyGuildMemberData.muted,
            deaf: modifyGuildMemberData.deafened,
            channel_id: modifyGuildMemberData.voiceChannelID === undefined ? undefined : voiceChannelID
        }
    });

    // Parse member
    const member: Member = Member._fromRawData(client, result, guildID);

    // Return
    return member;
}