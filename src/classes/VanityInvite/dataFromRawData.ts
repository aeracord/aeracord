import { Client, RawVanityInviteData, VanityInvite, VanityInviteData } from "../../internal";

export default function dataFromRawData(client: Client, rawData: RawVanityInviteData, guildID: string): VanityInviteData {

    // Parse vanity invite data
    const vanityInviteData: VanityInviteData = {
        guildID,
        code: rawData.code,
        uses: rawData.uses,
        fetchedAt: Date.now()
    };

    // Update cached vanity invite
    VanityInvite._updateObjectFromData(client, vanityInviteData);

    // Return
    return vanityInviteData;
}