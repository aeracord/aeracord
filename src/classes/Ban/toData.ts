import { Ban, BanData, User } from "../../internal";

export default function toData(ban: Ban): BanData {

    // Parse ban data
    return {
        guildID: ban.guildID,
        user: User.toData(ban.user),
        reason: ban.reason,
        fetchedAt: ban._lastUpdatedAt
    };
}