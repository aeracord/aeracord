import { Client, Member, MemberData, RawGuildMemberUpdateData } from "../../../../internal";

export default function guildMemberUpdate(client: Client, rawData: RawGuildMemberUpdateData) {

    // Get old member data
    const oldMember: Member | undefined = client.members.get(rawData.guild_id, rawData.user.id);
    const oldMemberData: MemberData | undefined = oldMember && Member.toData(oldMember);

    // Parse member
    const member: Member = Member._fromRawData(client, rawData, rawData.guild_id);

    // Set client roles
    if ((member.user.id === client.id) && (client._clientRoles)) client._clientRoles.set(member.guildID, member.roles);

    // Emit event
    client.emit("guildMemberUpdate", member, {
        rawData,
        guild: client.guilds.get(member.guildID),
        user: client.users.get(member.user.id),
        oldMemberData
    });
}