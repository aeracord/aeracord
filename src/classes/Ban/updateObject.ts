import { Ban, BanData, User } from "../../internal";

export default function updateObject(ban: Ban, banData: BanData) {

    // If the `BanData` was fetched before the `Ban` object was last updated, dont update anything
    if (banData.fetchedAt < ban._lastUpdatedAt) return;

    // Unmark as deleted
    if (ban.deleted) ban._unmarkAsDeleted();

    // Set data
    ban.guildID = banData.guildID;
    ban.user = User.fromData(ban.client, banData.user);
    ban.reason = banData.reason;
    ban._lastUpdatedAt = Date.now();
}