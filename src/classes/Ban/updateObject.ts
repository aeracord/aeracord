import { Ban, BanData } from "../../internal";

export default function updateObject(ban: Ban, banData: BanData) {

    // Set data
    ban.guildID = banData.guildID;
    ban.user = banData.user;
    ban.reason = banData.reason;
}