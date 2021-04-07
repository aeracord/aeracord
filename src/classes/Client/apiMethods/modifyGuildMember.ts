import { Channel, ChannelResolvable, Client, FetchQueue, Guild, GuildResolvable, Member, MemberData, RawMemberData, Role, RoleResolvable, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface ModifyGuildMemberData {
    nickname?: string | null;
    roles?: RoleResolvable[];
    muted?: boolean;
    deafened?: boolean;
    voiceChannelID?: ChannelResolvable | null;
}

export default async function modifyGuildMember(client: Client, guildResolvable: GuildResolvable, userResolvable: UserResolvable, modifyGuildMemberData: ModifyGuildMemberData): Promise<MemberData> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const userID: string | undefined = User.resolveID(userResolvable);
    if (!userID) throw new Error("Invalid user resolvable");
    const roles: Array<string | undefined> | undefined = modifyGuildMemberData.roles?.map((r: RoleResolvable) => Role.resolveID(r));
    if (roles?.find((r: string | undefined) => !r)) throw new Error("Invalid role resolvable in array of roles");
    const voiceChannelID: string | undefined | null = modifyGuildMemberData.voiceChannelID ? Channel.resolveID(modifyGuildMemberData.voiceChannelID) : null;
    if ((voiceChannelID === undefined) && (modifyGuildMemberData.voiceChannelID !== undefined)) throw new Error("Invalid channel resolvable for voice channel");

    // Missing permissions
    if (client._cacheStrategies.permissions.enabled) {
        if ((userResolvable instanceof Member) && (!client.canManageMember(userResolvable))) throw new Error("Missing permissions to manage this member");
        if ((modifyGuildMemberData.roles) && (!client.canManageRoles(guildID, modifyGuildMemberData.roles))) throw new Error("Missing permissions to manage the roles");
        if ((modifyGuildMemberData.nickname !== undefined) && (!client.hasPermission("MANAGE_NICKNAMES", guildID))) throw new Error("Missing manage nicknames permissions");
        if ((modifyGuildMemberData.muted !== undefined) && (!client.hasPermission("MUTE_MEMBERS", guildID))) throw new Error("Missing mute members permissions");
        if ((modifyGuildMemberData.deafened !== undefined) && (!client.hasPermission("DEAFEN_MEMBERS", guildID))) throw new Error("Missing deafen members permissions");
        if ((modifyGuildMemberData.voiceChannelID !== undefined) && (!client.hasPermission("MOVE_MEMBERS", guildID))) throw new Error("Missing move members permissions");
    }

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

    // Parse member data
    const memberData: MemberData = Member._fromRawData(client, result, guildID);

    // Return
    return memberData;
}