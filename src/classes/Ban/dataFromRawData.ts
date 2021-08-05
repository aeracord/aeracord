import { Ban, BanData, Client, RawBanData, User } from "../../internal";

export default function dataFromRawData(client: Client, rawData: RawBanData, guildID: string): BanData {

    // Parse ban data
    const banData: BanData = {
        guildID,
        user: User._dataFromRawData(client, rawData.user),
        reason: rawData.reason,
        fetchedAt: Date.now()
    };

    // Update cached ban
    Ban._updateObjectFromData(client, banData);

    // Return
    return banData;
}