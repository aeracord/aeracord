import { Ban, BanData } from "../../internal";

export default function toData(ban: Ban): BanData {

    // Parse ban data
    return {
        guildID: ban.guildID,
        user: ban.user,
        reason: ban.reason
    };
}