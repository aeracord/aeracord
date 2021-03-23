import { BanData, RawBanData, User } from "../../internal";

export default function fromRawData(rawData: RawBanData, guildID: string): BanData {

    // Parse ban data
    return {
        guildID,
        user: User._fromRawData(rawData.user),
        reason: rawData.reason
    };
}