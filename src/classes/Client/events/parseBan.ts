import { Ban, Client } from "../../../internal";
import parseUser from "./parseUser";
import { RawBanData } from "./rawBanData";

export default function parseBan(client: Client, rawData: RawBanData): Ban {

    // Parse ban
    const ban: Ban = {
        user: parseUser(client, rawData.user),
        reason: rawData.reason || undefined
    };

    // Return
    return ban;
}