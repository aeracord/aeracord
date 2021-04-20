import { BanData, RawBanData, User } from "../../internal";

export default function dataFromRawData(rawData: RawBanData, guildID: string): BanData {

    // Parse ban data
    return {
        guildID,
        user: User._dataFromRawData(rawData.user),
        reason: rawData.reason,
        fetchedAt: Date.now()
    };
}