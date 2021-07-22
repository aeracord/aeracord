import { Client, GuildMemberRemoveData, Member, RawGuildMemberRemoveData, ThreadMember, User } from "../../../../internal";

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

    // Get guild threads
    const guildThreads: string[] | undefined = client._guildThreads.get(data.guildID);

    // Loop through guild threads
    if (guildThreads) guildThreads.forEach((t: string) => {

        // Get thread member
        const threadMember: ThreadMember | undefined = client.threadMembers.get(t, data.user.id);

        // If the thread member is cached, mark it as deleted
        if (threadMember) threadMember._markAsDeleted();
    });

    // Emit event
    client.emit("guildMemberRemove", data, {
        rawData,
        member,
        guild: client.guilds.get(data.guildID)
    });
}