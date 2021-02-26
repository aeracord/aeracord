import { VanityInvite } from "../../../internal";
import { RawVanityInviteData } from "./rawVanityInviteData";

export default function parseVanityInvite(rawData: RawVanityInviteData): VanityInvite {

    // Parse vanity invite
    const vanityInvite: VanityInvite = {
        code: rawData.code || undefined,
        uses: rawData.uses
    };

    // Return
    return vanityInvite;
}