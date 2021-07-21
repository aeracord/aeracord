import { Channel, Client, RawChannelData, RawThreadListSyncData, RawThreadMemberData, ThreadChannel, ThreadListSyncData, ThreadMember } from "../../../../internal";

export default function threadListSync(client: Client, rawData: RawThreadListSyncData) {

    // Parse data
    const data: ThreadListSyncData = {
        guildID: rawData.guild_id,
        channelIDs: rawData.channel_ids,
        threads: rawData.threads.map((c: RawChannelData) => Channel._fromRawData(client, c) as ThreadChannel),
        threadMembers: rawData.members.map((m: RawThreadMemberData) => ThreadMember._fromRawData(client, m, rawData.guild_id))
    };

    // Cache thread permissions
    data.threads.forEach((t: ThreadChannel) => ThreadChannel._cacheThreadPermissions(client, { ...t, joined: data.threadMembers.some((tm: ThreadMember) => tm.id === t.id) }));

    // Emit event
    client.emit("threadListSync", data, {
        rawData,
        guild: client.guilds.get(data.guildID)
    });
}