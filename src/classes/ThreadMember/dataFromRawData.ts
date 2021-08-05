import { Client, RawThreadMemberData, ThreadMember, ThreadMemberData } from "../../internal";

export default function dataFromRawData(client: Client, rawData: RawThreadMemberData, guildID: string): ThreadMemberData {

    // Parse thread member data
    const threadMemberData: ThreadMemberData = {
        threadID: rawData.id,
        guildID,
        userID: rawData.user_id,
        joinedAt: new Date(rawData.join_timestamp).getTime(),
        flags: rawData.flags,
        fetchedAt: Date.now()
    };

    // Update cached thread member
    ThreadMember._updateObjectFromData(client, threadMemberData);

    // Return
    return threadMemberData;
}