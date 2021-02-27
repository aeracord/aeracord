import { Ban, Client, RawBanData, User } from "../../internal";

export default function fromRawData(client: Client, rawData: RawBanData, guildID: string): Ban {

    // Parse ban
    const ban: Ban = new Ban(client, {
        guildID,
        user: User._fromRawData(client, rawData.user),
        reason: rawData.reason || undefined
    });

    // Return
    return ban;
}