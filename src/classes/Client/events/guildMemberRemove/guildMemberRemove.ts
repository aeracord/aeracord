import { Client, GuildMemberRemoveData, Member, RawGuildMemberRemoveData, User } from "../../../../internal";

export default function guildMemberRemove(client: Client, rawData: RawGuildMemberRemoveData) {

    // Parse data
    const data: GuildMemberRemoveData = {
        guildID: rawData.guild_id,
        user: User._fromRawData(client, rawData.user)
    };

    // Get member
    const member: Member | undefined = client.members.get(data.guildID, data.user.id);

    // Mark as deleted
    if (member) member._markAsDeleted();

    // Emit event
    client.emit("guildMemberRemove", data, {
        rawData,
        member,
        guild: client.guilds.get(data.guildID)
    });
}