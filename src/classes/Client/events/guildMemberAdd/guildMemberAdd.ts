import { Client, Member, RawGuildMemberAddData } from "../../../../internal";

export default function guildMemberAdd(client: Client, rawData: RawGuildMemberAddData) {

    // Parse member
    const member: Member = Member._fromRawData(client, rawData, rawData.guild_id);

    // Emit event
    client.emit("guildMemberAdd", member, {
        rawData,
        guild: client.guilds.get(member.guildID),
        user: client.users.get(member.user.id)
    });
}