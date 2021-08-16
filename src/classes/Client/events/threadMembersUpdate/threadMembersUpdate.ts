import { ChannelTypes, Client, RawThreadMembersUpdateData, RawThreadMemberData, ThreadCacheData, ThreadChannel, ThreadMember, ThreadMembersUpdateData } from "../../../../internal";

export default function threadMembersUpdate(client: Client, rawData: RawThreadMembersUpdateData) {

    // Parse data
    const data: ThreadMembersUpdateData = {
        id: rawData.id,
        guildID: rawData.guild_id,
        memberCount: rawData.member_count,
        addedMembers: rawData.added_members ? rawData.added_members.map((m: RawThreadMemberData) => ThreadMember._fromRawData(client, m, rawData.guild_id)) : [],
        removedMemberIDs: rawData.removed_member_ids || []
    };

    // Get thread channel
    const thread: ThreadChannel | undefined = client.threads.get(data.id) as ThreadChannel | undefined;

    // Update member count
    if (thread) thread.memberCount = data.memberCount;

    // Mark thread members as deleted
    data.removedMemberIDs.forEach((m: string) => {

        // Get thread member
        const threadMember: ThreadMember | undefined = client.threadMembers.get(data.id, m);

        // If the thread member is cached, mark it as deleted
        if (threadMember) threadMember._markAsDeleted();
    });

    // If the client leaves a thread
    if (data.removedMemberIDs.includes(client.id)) {

        // Get the threads cache data
        const threadCacheData: ThreadCacheData | undefined = client._threadChannels.get(data.id);

        // Mark the thread as not joined
        if (threadCacheData) threadCacheData.joined = false;

        // If the client cant access the thread
        if (
            threadCacheData &&
            (
                (
                    threadCacheData.type === ChannelTypes.PUBLIC_THREAD &&
                    !client.hasPermission("VIEW_CHANNEL", threadCacheData.parentID) &&
                    !client.hasPermission("MANAGE_THREADS", threadCacheData.parentID)
                ) ||
                (
                    threadCacheData.type === ChannelTypes.PRIVATE_THREAD &&
                    !client.hasPermission("MANAGE_THREADS", threadCacheData.parentID)
                )
            )
        ) {

            // Mark as deleted
            if (thread) thread._markAsDeleted();

            // Uncache thread permissions
            ThreadChannel._uncacheThreadPermissions(client, data);
        }
    }

    // Emit event
    client.emit("threadMembersUpdate", data, {
        rawData,
        thread,
        guild: client.guilds.get(data.guildID)
    });
}