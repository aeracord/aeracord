import { Channel, Client, RawChannelData, RawChannelDataThreadMember, RawThreadListSyncData, ThreadChannel, ThreadListSyncData } from "../../../../internal";

export default function threadListSync(client: Client, rawData: RawThreadListSyncData) {

    // Parse data
    const data: ThreadListSyncData = {
        guildID: rawData.guild_id,
        channelIDs: rawData.channel_ids,
        threads: rawData.threads.map((c: RawChannelData) => Channel._fromRawData(client, c) as ThreadChannel),
        threadMembers: rawData.members.map((m: RawChannelDataThreadMember) => ({
            id: m.id as string,
            userID: m.user_id as string,
            joinTimestamp: new Date(m.join_timestamp).getTime(),
            flags: m.flags
        }))
    };

    // Cache thread permissions
    data.threads.forEach((t: ThreadChannel) => ThreadChannel._cacheThreadPermissions(client, t));

    // Emit event
    client.emit("threadListSync", data, {
        rawData,
        guild: client.guilds.get(data.guildID)
    });
}