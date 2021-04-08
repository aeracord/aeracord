import { Client, GuildMemberUpdateData, Member, MemberData, RawGuildMemberUpdateData, User } from "../../../../internal";

export default function guildMemberUpdate(client: Client, rawData: RawGuildMemberUpdateData) {

    // Parse data
    const data: GuildMemberUpdateData = {
        guildID: rawData.guild_id,
        nickname: rawData.nick || null,
        roles: rawData.roles,
        joinedAt: new Date(rawData.joined_at).getTime(),
        premiumSince: rawData.premium_since ? new Date(rawData.premium_since).getTime() : null,
        pending: rawData.pending || false,
        user: User._fromRawData(client, rawData.user)
    };

    // Get member
    const member: Member | undefined = client.members.get(data.guildID, data.user.id);

    // Get old member data
    const oldMemberData: MemberData | undefined = member && Member.toData(member);

    // Update data
    if (member) {
        member.nickname = data.nickname;
        member.roles = data.roles;
        member.joinedAt = data.joinedAt;
        member.premiumSince = data.premiumSince;
        member.pending = data.pending;
    }

    // Set client roles
    if ((data.user.id === client.id) && (client._clientRoles)) client._clientRoles.set(data.guildID, data.roles);

    // Emit event
    client.emit("guildMemberUpdate", data, {
        rawData,
        member,
        guild: client.guilds.get(data.guildID),
        user: client.users.get(data.user.id),
        oldMemberData
    });
}