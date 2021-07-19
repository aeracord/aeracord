import { Client, Member, MemberData, RawGuildMemberUpdateData, ThreadChannel } from "../../../../internal";

export default function guildMemberUpdate(client: Client, rawData: RawGuildMemberUpdateData) {

    // Get old member data
    const oldMember: Member | undefined = client.members.get(rawData.guild_id, rawData.user.id);
    const oldMemberData: MemberData | undefined = oldMember && Member.toData(oldMember);

    // Parse member
    const member: Member = Member._fromRawData(client, rawData, rawData.guild_id);

    // If the roles were updated for the client user
    if (member.user.id === client.id) {

        // Set client roles
        if (client._clientRoles) client._clientRoles.set(member.guildID, member.roles);

        // Recalculate thread permissions
        ThreadChannel._recalculateThreadPermissions(client, member.guildID);
    }

    // Emit event
    client.emit("guildMemberUpdate", member, {
        rawData,
        guild: client.guilds.get(member.guildID),
        user: client.users.get(member.user.id),
        oldMemberData
    });
}