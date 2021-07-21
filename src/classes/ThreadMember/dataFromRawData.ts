import { RawThreadMemberData, ThreadMemberData } from "../../internal";

export default function dataFromRawData(rawData: RawThreadMemberData, guildID: string): ThreadMemberData {

    // Parse thread member data
    return {
        threadID: rawData.id,
        guildID,
        userID: rawData.user_id,
        joinedAt: new Date(rawData.join_timestamp).getTime(),
        flags: rawData.flags,
        fetchedAt: Date.now()
    };
}