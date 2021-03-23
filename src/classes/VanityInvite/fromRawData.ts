import { RawVanityInviteData, VanityInviteData } from "../../internal";

export default function fromRawData(rawData: RawVanityInviteData, guildID: string): VanityInviteData {

    // Parse vanity invite data
    return {
        guildID,
        code: rawData.code,
        uses: rawData.uses
    };
}