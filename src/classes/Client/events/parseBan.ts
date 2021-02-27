import { Ban, Client, User } from "../../../internal";
import { RawBanData } from "./rawBanData";

export default function parseBan(client: Client, rawData: RawBanData): Ban {

    // Parse ban
    const ban: Ban = {
        user: User._fromRawData(client, rawData.user),
        reason: rawData.reason || undefined
    };

    // Return
    return ban;
}