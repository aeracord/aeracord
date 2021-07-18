import { Client, RawChannelDataThreadMember, RawThreadMembersUpdateData, ThreadChannel, ThreadMembersUpdateData } from "../../../../internal";

export default function threadMembersUpdate(client: Client, rawData: RawThreadMembersUpdateData) {

    // Parse data
    const data: ThreadMembersUpdateData = {
        id: rawData.id,
        guildID: rawData.guild_id,
        memberCount: rawData.member_count,
        addedMembers: rawData.added_members ? rawData.added_members.map((m: RawChannelDataThreadMember) => ({
            id: m.id as string,
            userID: m.user_id as string,
            joinTimestamp: new Date(m.join_timestamp).getTime(),
            flags: m.flags
        })) : [],
        removedMemberIDs: rawData.removed_member_ids || []
    };

    // Get thread channel
    const thread: ThreadChannel | undefined = client.threads.get(data.id) as ThreadChannel | undefined;

    // Update member count
    if (thread) thread.memberCount = data.memberCount;

    // Emit event
    client.emit("threadMembersUpdate", data, {
        rawData,
        thread,
        guild: client.guilds.get(data.guildID)
    });
}