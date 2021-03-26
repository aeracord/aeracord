import { Ban, BanData, Client, RawBanData, User } from "../../internal";

export default function fromRawData(client: Client, rawData: RawBanData, guildID: string): BanData {

    // Parse ban data
    const banData: BanData = {
        guildID,
        user: User._fromRawData(client, rawData.user),
        reason: rawData.reason
    };

    // Create ban object
    if (client._bans.cacheAll) Ban.fromData(client, banData);

    // Return
    return banData;
}